// src/proxy.ts
import { NextResponse } from "next/server";

export function proxy() {
  // No authentication logic - just continue
  return NextResponse.next();
}
