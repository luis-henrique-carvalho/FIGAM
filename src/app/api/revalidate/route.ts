import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

interface PrismicWebhookPayload {
  type: string;
  masterRef: string;
  releases: Record<string, unknown>;
  masks: Record<string, unknown>;
  tags: Record<string, unknown>;
  experiments: Record<string, unknown>;
  documents: string[];
  domain: string;
  apiUrl: string;
  secret: string | null;
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as PrismicWebhookPayload;

  const webhookSecret = process.env.PRISMIC_WEBHOOK_SECRET;

  if (webhookSecret) {
    const providedSecret = payload.secret;

    if (!providedSecret || providedSecret !== webhookSecret) {
      console.log("❌ Secret inválido ou não fornecido");
      return NextResponse.json(
        { message: "Invalid or missing secret" },
        { status: 401 }
      );
    }

    revalidateTag("prismic");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
