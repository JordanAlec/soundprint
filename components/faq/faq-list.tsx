import { faqGroups } from "@/lib/faq/faq-data";
import FaqSection from "./faq-section";

export default function FaqList() {
  return (
    <div className="flex flex-col gap-6">
      {faqGroups.map((group) => (
        <FaqSection key={group.heading} group={group} />
      ))}
    </div>
  );
}
