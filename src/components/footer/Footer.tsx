import { Logo } from "../shared/Logo";
import PayMethod from "./PayMethod";

export const Footer = () => {
  return (
    <footer className="flex flex-row justify-center bg-(--muted) text-(--muted-foreground)  w-full">
      <div className="flex flex-col px-[60px] py-[140px] md:flex-row md:justify-between md:align-middle gap-12 flex-wrap w-full max-w-[1920px]">
        <div className="flex flex-col items-start gap-4 min-w-[200px]">
          <div className="flex flex-col items-start w-[50%]">
            <Logo />
            <p className="text-sm">
              &copy; 2023 NexusHub. All rights reserved.
            </p>
          </div>
          <PayMethod />
        </div>

        <div className="flex flex-wrap gap-12">
          <FooterSection
            title="Company"
            links={["About Us", "Contact", "Partner"]}
          />
          <FooterSection
            title="Social"
            links={["Instagram", "Twitter", "Facebook", "LinkedIn"]}
          />
          <FooterSection
            title="FAQ"
            links={["Account", "Deliveries", "Orders", "Payments"]}
          />
          <FooterSection
            title="Resources"
            links={["E-books", "Tutorials", "Course", "Blog"]}
          />
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <div className="flex flex-col gap-2 min-w-[120px]">
    <h4 className="font-semibold text-(--foreground)">{title}</h4>
    {links.map((text) => (
      <a
        key={text}
        href="#"
        className="text-sm hover:text-(--primary-foreground) transition-colors"
      >
        {text}
      </a>
    ))}
  </div>
);
