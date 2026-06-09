import type { MetadataRoute } from "next";
import { jobs } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://govtrack-india.vercel.app";
  return [
    "",
    "/jobs",
    "/calendar",
    "/eligibility",
    "/dashboard",
    "/faq",
    "/privacy",
    "/terms",
    ...jobs.map((job) => `/jobs/${job.slug}`)
  ].map((url) => ({ url: `${base}${url}`, lastModified: new Date() }));
}
