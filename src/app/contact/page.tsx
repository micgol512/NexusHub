"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

export default function ContactPage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col gap-10">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 bg-muted rounded-xl p-6"> */}
      <div className="flex flex-row justify-around bg-(--muted) rounded-xl p-6">
        <div className="flex flex-col gap-3 justify-center">
          <h2 className="text-3xl font-semibold">Contact us</h2>
          <p className="text-muted-foreground">
            If you have any questions or require additional information, we
            encourage you to contact us. We are ready to assist in answering
            your inquiries
          </p>
          <Button variant={"outline"} className="mt-4 w-fit">
            Direct Chat →
          </Button>
        </div>

        <Image
          src={"https://i.ibb.co/TD3hNyVK/Image.png"}
          alt={"contact"}
          height={900}
          width={1000}
          className="w-max h-max"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-4 shadow">
          <h3 className="font-semibold">Our Location</h3>
          <p className="text-sm mt-2">Kadetów 20, 03-987 Warsaw, Poland</p>
          <a href="#" className="text-primary font-medium mt-2 inline-block">
            Visit us
          </a>
        </div>

        <div className="bg-card rounded-xl p-4 shadow">
          <h3 className="font-semibold">Email Us</h3>
          <p className="text-sm mt-2">
            Through email you can submit complaints and also suggestions to us.
          </p>
          <Link href="#" className="text-primary font-medium mt-2 inline-block">
            NexusHub-acc@contact.com
          </Link>
        </div>

        <div className="bg-card rounded-xl p-4 shadow">
          <h3 className="font-semibold">Mobile Chat</h3>
          <p className="text-sm mt-2">
            We can also be reached using Whatsapp and calling.
          </p>
          <p className="text-primary font-medium mt-2">+62 812 382 33xxx</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow">
          <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" type="email" />
            <Input placeholder="Mobile Number" />
            <div className="flex items-center space-x-2">
              <Checkbox id="subscribe" />
              <label htmlFor="subscribe" className="text-sm">
                Subscribe to Us
              </label>
            </div>
            <Button className="w-full">Send</Button>
          </form>
        </div>

        <div className="rounded-xl overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.6778690354827!2d21.112630000000003!3d52.212901200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ed3a12b1de8fd%3A0xf647827ac8e043af!2sDevstock!5e0!3m2!1spl!2spl!4v1747693351017!5m2!1spl!2spl"
            width="100%"
            height="100%"
            className="w-full h-[400px] border-none"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
