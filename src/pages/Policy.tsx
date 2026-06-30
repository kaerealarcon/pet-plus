import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/seo/Seo";

const VALID_TYPES = ["troca", "privacidade", "termos"] as const;
type PolicyType = (typeof VALID_TYPES)[number];

const KEY_MAP: Record<PolicyType, string> = {
  troca: "exchange",
  privacidade: "privacy",
  termos: "terms",
};

export default function Policy() {
  const { type } = useParams<{ type: string }>();
  const { t } = useTranslation();

  if (!type || !VALID_TYPES.includes(type as PolicyType)) return <Navigate to="/faq" replace />;

  const key = KEY_MAP[type as PolicyType];
  const title = t(`policies.${key}.title`);
  const content = t(`policies.${key}.content`);
  const paragraphs = content.split("\n\n");

  return (
    <>
      <Seo title={title} description={paragraphs[0]} />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold text-purple-950">{title}</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-purple-900/70">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </>
  );
}
