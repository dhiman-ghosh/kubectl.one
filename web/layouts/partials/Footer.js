import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import ImageFallback from "@layouts/components/ImageFallback";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;
  return (
    <footer className="pt-16 pb-16">
      <div className="container text-center">
        {/* copyright */}
        {markdownify(copyright, "p", "text-text")}
      </div>
      <div className="mt-4">
      <Link href={"https://ko-fi.com/dhiman"} className="block" target="_blank">
        <ImageFallback
          className="mx-auto"
          src="/images/kofi_bg_tag_dark.png"
          width={140}
          height={55}
          priority={true}
          alt="Buy me a coffee"
        />
      </Link>
      </div>
    </footer>
  );
};

export default Footer;
