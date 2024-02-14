import { z } from "zod";
import { router, userProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { metadata } from "@/app/layout";

export const purchaseRouter = router({
  checkoutCourse: userProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const course = await db.course.findUnique({
          where: {
            id: input.courseId,
            isPublished: true,
          },
        });

        if (!course) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Course not found",
          });
        }

        // check if course is already purchased
        const isPurchased = await db.purchaseCourse.findFirst({
          where: {
            userId: ctx.userId,
            courseId: input.courseId,
          },
        });

        if (isPurchased) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Course already purchased",
          });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
          {
            quantity: 1,
            price_data: {
              currency: "INR",
              product_data: {
                name: course.title,
                description: course.description!,
              },
              unit_amount: Math.round(course.cost! * 100),
            },
          },
        ];

        let StripeCustomer = await db.stripeCustomer.findFirst({
          where: {
            userId: ctx.userId,
          },
          select: {
            StripeCustomerId: true,
          },
        });

        if (!StripeCustomer) {
          const customer = await stripe.customers.create({
            email: ctx.email,
          });

          StripeCustomer = await db.stripeCustomer.create({
            data: {
              userId: ctx.userId,
              StripeCustomerId: customer.id,
            },
          });

          console.log({ StripeCustomer });
        }

        const session = await stripe.checkout.sessions.create({
          customer: StripeCustomer.StripeCustomerId,
          line_items,
          mode: "payment",
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/learn/${course.id}/`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/learn/${course.id}/`,
          metadata: {
            courseId: course.id,
            userId: ctx.userId,
          },
        });

        return {
          url: session.url,
        };
        
      } catch (error: any) {
        console.log("[COURSE CHECKOUT ERROR]: " + error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
