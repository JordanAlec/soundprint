import { encodeProfileToken } from "@/lib/profile/token";
import { SAMPLE_PROFILE } from "@/lib/profile/profile-schema";
import HomeNavItem from "./home-nav-item";

export default async function HomeNav() {
  const sampleProfileToken = await encodeProfileToken(SAMPLE_PROFILE);

  const items = [
    {
      href: "/create",
      label: "Create",
      description: "Fill in what applies, get a shareable link.",
    },
    {
      href: `/profile/${sampleProfileToken}`,
      label: "Sample profile",
      description: "See a decoded profile before you build your own.",
    },
    {
      href: "/faq",
      label: "FAQ",
      description: "How SoundPrint works, and what to watch for.",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <HomeNavItem key={item.href} {...item} />
      ))}
    </div>
  );
}
