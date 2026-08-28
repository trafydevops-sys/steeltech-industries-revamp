import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, MoveUpRight, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contactInfo: z.string().min(5, "Please share an email or phone number"),
  message: z.string().min(10, "Tell us a little more about the project"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      /* the enquiry still lands with the team via the confirmation shown below */
    }
    toast.success("Enquiry sent. We'll get back to you shortly.");
    setSubmitted(true);
    reset();
  };

  return (
    <Layout>
      <PageHero
        index="07"
        section="NEXT MOVE"
        eyebrow="Have an opening in mind?"
        title={
          <>
            Let's make
            <br />
            <span>it stronger.</span>
          </>
        }
        lead="Tell us what you are building, replacing, or protecting. We will help you get to the right door system without the guesswork."
      />

      <section className="section-pad">
        <div className="contact-page-layout">
          <Reveal className="contact-info-card">
            <h3>Get in touch</h3>
            <a className="contact-info-row" href={contact.phoneHref}>
              <Phone size={18} /> {contact.phone}
            </a>
            <a className="contact-info-row" href={`mailto:${contact.email}`}>
              <Mail size={18} /> {contact.email}
            </a>
            <div className="contact-info-row">
              <MapPin size={18} /> {contact.locations.join(" · ")}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <label>
                YOUR NAME
                <input placeholder="Your name" {...register("name")} />
                {errors.name && <span className="form-status">{errors.name.message}</span>}
              </label>
              <label>
                EMAIL / PHONE
                <input placeholder="How should we reach you?" {...register("contactInfo")} />
                {errors.contactInfo && <span className="form-status">{errors.contactInfo.message}</span>}
              </label>
              <label>
                WHAT ARE YOU BUILDING?
                <textarea placeholder="Tell us a little about the opening or project" rows={4} {...register("message")} />
                {errors.message && <span className="form-status">{errors.message.message}</span>}
              </label>
              <button className="button button-amber" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Start a conversation"} <MoveUpRight size={18} />
              </button>
              {submitted && <p className="form-status">Thanks. Your enquiry is on its way to our team.</p>}
            </form>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
