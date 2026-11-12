<?php
/**
 * Contact / quote form endpoint for umairsadiq.com (static site on Hostinger).
 *
 * POST JSON: { name, email, phone?, message, source, page, fields: {label: value}, website_url (honeypot), elapsed }
 * Sends a branded HTML email to hello@umairsadiq.com with Reply-To set to the visitor,
 * and keeps a copy of every lead in ../../form-data/leads.jsonl (outside public_html).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');

const TO_EMAIL = 'hello@umairsadiq.com';
const FROM_EMAIL = 'hello@umairsadiq.com';
const MAX_PER_HOUR = 5;
const ALLOWED_ORIGINS = ['https://umairsadiq.com', 'https://www.umairsadiq.com'];

function respond(int $code, array $data): void
{
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function clean(mixed $v, int $max): string
{
    $s = is_scalar($v) ? (string) $v : '';
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    $s = trim($s);
    return mb_substr($s, 0, $max);
}

/** Single-line value for headers and labels: no line breaks, no angle brackets or quotes. */
function line(string $s): string
{
    return trim(preg_replace('/[\r\n<>"]+/', ' ', $s) ?? '');
}

function e(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/**
 * Sends one message through Hostinger SMTP (SSL, port 465) as hello@umairsadiq.com.
 * The mailbox password lives in ../../form-data/smtp-password.txt (outside public_html).
 * Returns '' on success, or an error description.
 */
function smtp_send(string $password, string $to, string $data): string
{
    $f = @stream_socket_client('ssl://smtp.hostinger.com:465', $en, $es, 15);
    if (!$f) {
        return "connect: $es";
    }
    stream_set_timeout($f, 20);
    $read = function () use ($f): string {
        $out = '';
        while (($l = fgets($f, 1024)) !== false) {
            $out .= $l;
            if (strlen($l) < 4 || $l[3] === ' ') {
                break;
            }
        }
        return $out;
    };
    $cmd = function (string $c, array $ok) use ($f, $read): string {
        if ($c !== '') {
            fwrite($f, $c . "\r\n");
        }
        $r = $read();
        return in_array((int) substr($r, 0, 3), $ok, true) ? '' : trim($r);
    };
    $steps = [
        ['', [220]],
        ['EHLO umairsadiq.com', [250]],
        ['AUTH LOGIN', [334]],
        [base64_encode(FROM_EMAIL), [334]],
        [base64_encode($password), [235]],
        ['MAIL FROM:<' . FROM_EMAIL . '>', [250]],
        ['RCPT TO:<' . $to . '>', [250, 251]],
        ['DATA', [354]],
    ];
    foreach ($steps as [$c, $ok]) {
        $err = $cmd($c, $ok);
        if ($err !== '') {
            fclose($f);
            return (str_starts_with($c, 'AUTH') || $ok === [235]) ? 'auth: ' . $err : $err;
        }
    }
    // Dot-stuffing, then end of data.
    $data = preg_replace('/^\./m', '..', str_replace("\r\n", "\n", $data)) ?? $data;
    fwrite($f, str_replace("\n", "\r\n", $data) . "\r\n.\r\n");
    $err = $cmd('', [250]);
    fwrite($f, "QUIT\r\n");
    fclose($f);
    return $err;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
    respond(403, ['ok' => false, 'error' => 'Forbidden.']);
}

$raw = file_get_contents('php://input', false, null, 0, 30000) ?: '';
$in = json_decode($raw, true);
if (!is_array($in)) {
    $in = $_POST;
}

// Spam traps: a hidden field humans never fill, and forms sent impossibly fast.
// Bots get a normal "ok" so they don't retry.
if (clean($in['website_url'] ?? '', 200) !== '' || (int) ($in['elapsed'] ?? 99999) < 2500) {
    respond(200, ['ok' => true]);
}

$name = line(clean($in['name'] ?? '', 80));
$email = line(clean($in['email'] ?? '', 120));
$phone = line(clean($in['phone'] ?? '', 40));
$message = clean($in['message'] ?? '', 4000);
$source = line(clean($in['source'] ?? 'website', 40));
$page = line(clean($in['page'] ?? '', 200));

$fields = [];
if (isset($in['fields']) && is_array($in['fields'])) {
    foreach (array_slice($in['fields'], 0, 12, true) as $k => $v) {
        $label = line(clean($k, 40));
        $value = line(clean($v, 300));
        if ($label !== '' && $value !== '') {
            $fields[$label] = $value;
        }
    }
}

if (mb_strlen($name) < 2) {
    respond(422, ['ok' => false, 'error' => 'Please enter your name.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}
if (mb_strlen($message) < 10) {
    respond(422, ['ok' => false, 'error' => 'Tell me a little about the project (a sentence is fine).']);
}
if ($phone !== '' && !preg_match('/^[+()\d\s.-]{6,40}$/', $phone)) {
    $phone = '';
}

// Storage outside the web root: rate limits and a backup of every lead.
$dataDir = dirname(__DIR__, 2) . '/form-data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0700, true);
}
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateFile = $dataDir . '/rate-' . hash('sha256', $ip . '|umairsadiq') . '.json';
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_values(array_filter((array) json_decode((string) file_get_contents($rateFile), true), fn ($t) => is_int($t) && $t > $now - 3600));
}
if (count($hits) >= MAX_PER_HOUR) {
    respond(429, ['ok' => false, 'error' => 'Too many messages in a short time. Please try again later or message me on WhatsApp.']);
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

// ── Emails ──────────────────────────────────────────────────────────────────
date_default_timezone_set('Asia/Karachi');
$when = date('D, j M Y, g:i A') . ' PKT';
$first = explode(' ', $name)[0];
$topic = $fields['Looking for'] ?? $fields['Project'] ?? 'Project enquiry';
$waDigits = preg_replace('/\D+/', '', $phone) ?? '';
$waHref = $waDigits !== '' ? 'https://wa.me/' . $waDigits : '';
$sourceLabel = [
    'hire-modal' => 'Start a project form',
    'quote-hero' => 'Quote form, top of page',
    'quote-footer' => 'Quote form, bottom of page',
][$source] ?? $source;

/** Shared email shell: dark header with the US badge, white card, dark footer. Table layout for every mail app. */
function shell(string $badge, string $inner, string $footer): string
{
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="color-scheme" content="light"><style>@media (max-width:620px){.wrap{padding:12px!important}.card{padding:22px!important}.h1{font-size:24px!important}.btn{display:block!important;text-align:center!important;margin:10px 0 0 0!important}}</style>'
        . '</head><body style="margin:0;padding:0;background:#f3f1ea;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ea;"><tr><td class="wrap" align="center" style="padding:32px 16px;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">'
        . '<tr><td style="background:#0b0b0e;border-radius:20px 20px 0 0;padding:22px 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
        . '<td style="vertical-align:middle;"><span style="display:inline-block;width:38px;height:38px;line-height:38px;border-radius:50%;background:#d4ff3a;color:#0b0b0e;font-weight:800;font-size:14px;text-align:center;">US</span>'
        . '<span style="color:#f3f1ea;font-weight:700;font-size:16px;margin-left:10px;vertical-align:middle;">Umair Sadiq</span></td>'
        . '<td align="right" style="vertical-align:middle;color:#d4ff3a;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;">' . e($badge) . '</td>'
        . '</tr></table></td></tr>'
        . '<tr><td class="card" style="background:#ffffff;padding:32px 28px;">' . $inner . '</td></tr>'
        . '<tr><td style="background:#0b0b0e;border-radius:0 0 20px 20px;padding:18px 28px;color:#9b998f;font-size:12px;line-height:1.6;">' . $footer . '</td></tr>'
        . '</table></td></tr></table></body></html>';
}

function label(string $t): string
{
    return '<p style="margin:0 0 8px 0;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b6a63;">' . e($t) . '</p>';
}

function button(string $href, string $text, bool $primary = true): string
{
    $style = $primary
        ? 'background:#d4ff3a;color:#0b0b0e;'
        : 'background:#ffffff;color:#121215;border:1px solid #d6d4cc;';
    return '<a class="btn" href="' . e($href) . '" style="display:inline-block;margin:6px 8px 0 0;padding:13px 22px;border-radius:999px;' . $style . 'font-weight:700;font-size:15px;text-decoration:none;">' . e($text) . '</a>';
}

$rows = '';
foreach ($fields as $k => $v) {
    $rows .= '<tr><td style="padding:10px 0;border-bottom:1px solid #ececea;color:#6b6a63;font-size:13px;width:38%;vertical-align:top;">' . e($k) . '</td>'
        . '<td style="padding:10px 0;border-bottom:1px solid #ececea;color:#121215;font-size:14px;font-weight:600;vertical-align:top;">' . e($v) . '</td></tr>';
}
$detailsTable = $rows !== ''
    ? '<div style="margin:28px 0 0 0;">' . label('Project details') . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $rows . '</table></div>'
    : '';
$messageBox = '<div style="margin:28px 0 0 0;padding:20px;border-radius:14px;background:#f7f6f1;border-left:4px solid #d4ff3a;">'
    . label('Message') . '<p style="margin:0;font-size:15px;line-height:1.65;color:#121215;">' . nl2br(e($message)) . '</p></div>';
$fieldsText = '';
foreach ($fields as $k => $v) {
    $fieldsText .= "{$k}: {$v}\n";
}

// 1) Notification to Umair
$ownerSubject = "New enquiry from {$name}: " . mb_substr($topic, 0, 60);
$replyHref = 'mailto:' . rawurlencode($email) . '?subject=' . rawurlencode('Re: your project enquiry');
$ownerHtml = shell(
    'New lead',
    label($sourceLabel)
    . '<h1 class="h1" style="margin:0 0 4px 0;font-size:28px;line-height:1.2;color:#121215;">' . e($name) . '</h1>'
    . '<p style="margin:0 0 22px 0;font-size:15px;"><a href="mailto:' . e($email) . '" style="color:#21759B;text-decoration:none;">' . e($email) . '</a>'
    . ($phone !== '' ? ' &nbsp;·&nbsp; <span style="color:#121215;">' . e($phone) . '</span>' : '') . '</p>'
    . button($replyHref, 'Reply to ' . $first)
    . ($waHref !== '' ? '<a class="btn" href="' . e($waHref) . '" style="display:inline-block;margin:6px 0 0 0;padding:13px 22px;border-radius:999px;background:#25D366;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;">WhatsApp ' . e($phone) . '</a>' : '')
    . $messageBox . $detailsTable,
    'Received ' . e($when) . ($page !== '' ? '<br>Page: <a href="' . e($page) . '" style="color:#d4ff3a;text-decoration:none;">' . e($page) . '</a>' : '')
    . '<br>Press Reply to answer ' . e($name) . ' directly. A confirmation email was sent to them.'
);
$ownerText = "New enquiry ({$sourceLabel})\n\nName: {$name}\nEmail: {$email}\n" . ($phone !== '' ? "Phone: {$phone}\n" : '')
    . "\nMessage:\n{$message}\n\n{$fieldsText}\nReceived {$when}" . ($page !== '' ? "\nPage: {$page}" : '') . "\n";

// 2) Confirmation to the visitor
$clientSubject = "Thanks {$first}, I've received your project details";
$clientHtml = shell(
    'Message received',
    '<h1 class="h1" style="margin:0 0 14px 0;font-size:28px;line-height:1.2;color:#121215;">Thanks, ' . e($first) . '!</h1>'
    . '<p style="margin:0 0 14px 0;font-size:16px;line-height:1.65;color:#2b2a26;">Your project details reached me. I read every enquiry myself and will reply within 24 hours with a plan, a timeline and a fixed quote in USD.</p>'
    . '<p style="margin:0 0 22px 0;font-size:16px;line-height:1.65;color:#2b2a26;">If it&rsquo;s urgent, message me on WhatsApp. I&rsquo;m online from 9 AM to 2 AM Pakistan time.</p>'
    . button('https://wa.me/923244604162', 'WhatsApp me')
    . button('https://umairsadiq.com/work/', 'See my work', false)
    . '<div style="margin:30px 0 0 0;">' . label('What you sent') . '</div>'
    . '<div style="padding:20px;border-radius:14px;background:#f7f6f1;border-left:4px solid #d4ff3a;"><p style="margin:0;font-size:15px;line-height:1.65;color:#121215;">' . nl2br(e($message)) . '</p></div>'
    . $detailsTable
    . '<p style="margin:30px 0 0 0;font-size:15px;line-height:1.6;color:#2b2a26;">Talk soon,<br><strong>Umair Sadiq</strong><br><span style="color:#6b6a63;">WordPress Developer &amp; SEO Specialist</span></p>',
    '<a href="https://umairsadiq.com/" style="color:#d4ff3a;text-decoration:none;">umairsadiq.com</a> &nbsp;·&nbsp; hello@umairsadiq.com &nbsp;·&nbsp; +92 324 4604162'
    . '<br>You received this because you sent a message through the form on umairsadiq.com. Reply to this email to reach me.'
);
$clientText = "Hi {$first},\n\nThanks for your message. Your project details reached me and I'll reply within 24 hours with a plan, a timeline and a fixed quote in USD.\n\n"
    . "Urgent? WhatsApp me: https://wa.me/923244604162\nMy work: https://umairsadiq.com/work/\n\nWhat you sent:\n{$message}\n\n{$fieldsText}\nTalk soon,\nUmair Sadiq\nWordPress Developer & SEO Specialist\nhttps://umairsadiq.com\n";

/** A complete message (headers + multipart body) in quoted-printable, which spam filters prefer over base64. */
function mime(string $fromName, string $to, string $replyName, string $replyEmail, string $subject, string $text, string $html, array $extra = []): string
{
    $b = 'b_' . bin2hex(random_bytes(12));
    $enc = fn (string $s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
    $headers = array_merge([
        'Date: ' . date('r'),
        'From: ' . $enc($fromName) . ' <' . FROM_EMAIL . '>',
        'To: ' . $to,
        'Reply-To: ' . $enc($replyName) . ' <' . $replyEmail . '>',
        'Subject: ' . $enc($subject),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@umairsadiq.com>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $b . '"',
    ], $extra);
    $qp = fn (string $s) => quoted_printable_encode(str_replace("\n", "\r\n", str_replace("\r\n", "\n", $s)));
    return implode("\r\n", $headers) . "\r\n\r\n"
        . "--{$b}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n" . $qp($text) . "\r\n"
        . "--{$b}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n" . $qp($html) . "\r\n"
        . "--{$b}--";
}

$passFile = $dataDir . '/smtp-password.txt';
$password = is_file($passFile) ? trim((string) file_get_contents($passFile)) : '';
$smtpError = $password === ''
    ? 'no smtp-password.txt'
    : smtp_send($password, TO_EMAIL, mime("{$name} via umairsadiq.com", TO_EMAIL, $name, $email, $ownerSubject, $ownerText, $ownerHtml));
$sent = $smtpError === '';

// Confirmation: at most 2 per address per day, so the form can't be used to flood someone's inbox.
$confirmError = 'skipped';
if ($sent) {
    $capFile = $dataDir . '/sent-' . hash('sha256', strtolower($email) . '|umairsadiq') . '.json';
    $caps = is_file($capFile)
        ? array_values(array_filter((array) json_decode((string) file_get_contents($capFile), true), fn ($t) => is_int($t) && $t > $now - 86400))
        : [];
    if (count($caps) < 2) {
        $confirmError = smtp_send($password, $email, mime('Umair Sadiq', $email, 'Umair Sadiq', TO_EMAIL, $clientSubject, $clientText, $clientHtml, ['Auto-Submitted: auto-replied']));
        $caps[] = $now;
        @file_put_contents($capFile, json_encode($caps), LOCK_EX);
    }
}

// Backup copy, even if the email fails.
@file_put_contents(
    $dataDir . '/leads.jsonl',
    json_encode([
        'time' => date('c'),
        'sent' => $sent,
        'error' => $smtpError,
        'confirmation' => $confirmError === '' ? 'sent' : $confirmError,
        'source' => $source,
        'page' => $page,
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'fields' => $fields,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE) . "\n",
    FILE_APPEND | LOCK_EX
);

if (!$sent) {
    respond(502, ['ok' => false, 'error' => "Sorry, the message couldn't be sent right now. Please message me on WhatsApp or email hello@umairsadiq.com."]);
}
respond(200, ['ok' => true]);
