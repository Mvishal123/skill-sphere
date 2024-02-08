import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { metadata } from "@/app/layout";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_KEY as string
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.mesage}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.userId;
  const courseId = session.metadata?.courseId;

  console.log("In here");
  

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Webhookk error: Missing metadata", {
        status: 400,
      });
    }

    console.log("in herere");
    

    await db.purchaseCourse.create({
      data: {
        userId,
        courseId,
      },
    });

  } else {
    return new NextResponse("Webhook error: Unhandled event type", {
      status: 200,
    });
  }

  return new NextResponse(null, { status: 200 });
}
