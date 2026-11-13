<?php
/**
 * Issues a short-lived signed token that the contact form must send back.
 * Scripts that POST straight to contact.php without loading the site never get one,
 * and contact.php rejects tokens used less than 3 seconds after they were issued.
 * The signing secret is created once in ../../form-data/form-secret.txt (outside public_html).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$dataDir = dirname(__DIR__, 2) . '/form-data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0700, true);
}
$secretFile = $dataDir . '/form-secret.txt';
$secret = is_file($secretFile) ? trim((string) file_get_contents($secretFile)) : '';
if (strlen($secret) < 32) {
    $secret = bin2hex(random_bytes(32));
    @file_put_contents($secretFile, $secret, LOCK_EX);
}

$payload = time() . '.' . bin2hex(random_bytes(8));
echo json_encode(['ok' => true, 'token' => $payload . '.' . hash_hmac('sha256', $payload, $secret)]);
