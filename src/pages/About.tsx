import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Stethoscope, Scissors, Heart, Building2 } from "lucide-react";
import { Seo } from "../components/seo/Seo";

const TEAM = [
  {
    role: "vetRole",
    bio: "vetBio",
    name: "Dra. Camila Rocha",
    icon: Stethoscope,
    image: "https://i.pravatar.cc/300?img=45",
  },
  {
    role: "groomerRole",
    bio: "groomerBio",
    name: "Diego Santos",
    icon: Scissors,
    image: "https://i.pravatar.cc/300?img=33",
  },
  {
    role: "founderRole",
    bio: "founderBio",
    name: "Renata Alves",
    icon: Heart,
    image: "https://i.pravatar.cc/300?img=49",
  },
];

const STRUCTURE_IMAGE =
  "https://images.unsplash.com/photo-1601758174039-110b9e5e0d24?w=1100&q=80&auto=format&fit=crop";

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("about.title")} description={t("about.subtitle")} />

      <section className="bg-gradient-hero py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-purple-950">{t("about.title")}</h1>
          <p className="mx-auto mt-3 max-w-xl text-purple-900/60">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-purple-950">{t("about.historyTitle")}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-purple-900/70">{t("about.historyText")}</p>
      </section>

      <section className="bg-purple-50/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-purple-950">{t("about.teamTitle")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center rounded-3xl border border-purple-100 bg-white p-7 text-center shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-purple-100"
                />
                <h3 className="mt-4 font-display text-lg font-bold text-purple-950">{member.name}</h3>
                <span className="mt-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-purple-600">
                  <member.icon size={13} />
                  {t(`about.${member.role}`)}
                </span>
                <p className="mt-3 text-sm text-purple-900/60">{t(`about.${member.bio}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-purple text-white">
              <Building2 size={20} />
            </span>
            <h2 className="font-display text-2xl font-bold text-purple-950">{t("about.structureTitle")}</h2>
            <p className="mt-4 leading-relaxed text-purple-900/70">{t("about.structureText")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-video overflow-hidden rounded-3xl shadow-glow-lg"
          >
            <img src={STRUCTURE_IMAGE} alt={t("about.structureTitle")} loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
