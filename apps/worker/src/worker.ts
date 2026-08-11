export interface WorkerRunResult {
  readonly processed: number;
  readonly service: "worker";
  readonly status: "idle";
}

export function runOnce(): WorkerRunResult {
  return { processed: 0, service: "worker", status: "idle" };
}
