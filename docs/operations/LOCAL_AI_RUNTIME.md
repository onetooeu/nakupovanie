# Local AI Runtime

The local Builder model is qwen2.5-coder:14b-instruct.
The local Builder provider is Ollama native /api/chat.
Native tool_calls are preferred and a strict NDJSON compatibility fallback is used when native tool calls are unavailable.
Builder context 8192 and local Reviewer gpt-oss:20b context 4096.
Local inference is CPU-only and only one local model is loaded at a time.
The local Builder path no longer uses Codex OSS.