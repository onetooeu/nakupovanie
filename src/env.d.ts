/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        ADMIN_PASSWORD?: string;
        ADMIN_COOKIE_SECRET?: string;
        RESEND_API_KEY?: string;
        EMAIL_FROM?: string;
        ADMIN_NOTIFY_EMAIL?: string;
      };
    };
  }
}
