import React, { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  BookMarked,
  ExternalLink,
  Info,
  ShieldAlert,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getSupportArticle, supportSections } from "@/data/support";

const calloutToneMap = {
  info: {
    icon: Info,
    wrapper: "border-sky-200 bg-sky-50",
    eyebrow: "text-sky-700",
    title: "text-sky-900",
    body: "text-sky-800",
  },
  warm: {
    icon: BookMarked,
    wrapper: "border-amber-200 bg-[#fff7ed]",
    eyebrow: "text-[#9a3412]",
    title: "text-[#7c2d12]",
    body: "text-[#9a3412]",
  },
  danger: {
    icon: ShieldAlert,
    wrapper: "border-rose-200 bg-rose-50",
    eyebrow: "text-rose-700",
    title: "text-rose-900",
    body: "text-rose-800",
  },
};

const SupportArticlePage = () => {
  const { slug = "overview" } = useParams();
  const article = getSupportArticle(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const section = useMemo(
    () => supportSections.find((item) => item.id === article?.sectionId),
    [article?.sectionId],
  );

  const relatedArticles = useMemo(
    () =>
      (article?.relatedSlugs || [])
        .map((relatedSlug) => getSupportArticle(relatedSlug))
        .filter(Boolean),
    [article],
  );

  if (!article) {
    return <Navigate to="/help/overview" replace />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div className="bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_48%,#ecfeff_100%)] p-8 sm:p-10">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-[#fff7ed] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a3412]">
              {article.eyebrow}
            </span>
            {section ? (
              <span className="rounded-full bg-[#ecfeff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                {section.title}
              </span>
            ) : null}
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight text-black sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {article.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              {article.readingTime}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
              {article.updatedLabel}
            </span>
          </div>
        </div>
      </section>

      {article.highlights?.length ? (
        <section className="grid gap-4 md:grid-cols-3">
          {article.highlights.map((highlight) => (
            <article
              key={highlight}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm leading-7 text-slate-600">{highlight}</p>
            </article>
          ))}
        </section>
      ) : null}

      <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="space-y-10">
          {article.content.map((block) => (
            <section key={block.title} className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                  Section
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-black">
                  {block.title}
                </h2>
              </div>

              {block.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}

              {block.bullets?.length ? (
                <ul className="space-y-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-7 text-slate-600"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#f97316]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {block.callout ? (() => {
                const tone =
                  calloutToneMap[block.callout.tone] || calloutToneMap.info;
                const Icon = tone.icon;

                return (
                  <article className={`rounded-[1.75rem] border p-5 ${tone.wrapper}`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`mt-1 ${tone.eyebrow}`} size={18} />
                      <div>
                        <p
                          className={`text-sm font-semibold uppercase tracking-[0.12em] ${tone.eyebrow}`}
                        >
                          Note
                        </p>
                        <h3 className={`mt-3 text-xl font-semibold ${tone.title}`}>
                          {block.callout.title}
                        </h3>
                        <p className={`mt-3 text-sm leading-7 ${tone.body}`}>
                          {block.callout.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })() : null}
            </section>
          ))}
        </div>
      </section>

      {article.faqs?.length ? (
        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Questions
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-black">
            Frequently asked questions
          </h2>

          <Accordion type="single" collapsible className="mt-8">
            {article.faqs.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-slate-200"
              >
                <AccordionTrigger className="py-5 text-base font-semibold text-slate-900 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}

      {article.resources?.length ? (
        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Support details
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {article.resources.map((resource) => (
              <article
                key={`${resource.label}-${resource.value}`}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {resource.label}
                </p>
                {resource.href ? (
                  <a
                    href={resource.href}
                    className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-slate-900 hover:text-[#c2410c]"
                  >
                    <span>{resource.value}</span>
                    <ExternalLink size={15} />
                  </a>
                ) : (
                  <p className="mt-3 text-base font-semibold text-slate-900">
                    {resource.value}
                  </p>
                )}
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {resource.description}
                </p>
              </article>
            ))}
          </div>

          {article.cta ? (
            <div className="mt-8">
              <Button asChild variant="brand" size="pill">
                <Link to={article.cta.to}>
                  <span>{article.cta.label}</span>
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          ) : null}
        </section>
      ) : null}

      {relatedArticles.length ? (
        <section className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Related articles
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.slug}
                to={`/help/${relatedArticle.slug}`}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#fdba74] hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {
                    supportSections.find(
                      (item) => item.id === relatedArticle.sectionId,
                    )?.title
                  }
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {relatedArticle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {relatedArticle.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c2410c]">
                  <span>Read article</span>
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default SupportArticlePage;
