import Image from "next/image";

export default function Home() {
  return (
    <section>
      <p id="zero-state">
        <Image src="/nextjs.svg" alt="NextJS Logo" width={72} height={16} />
        <br />
        This is a demo for NextJS 13
        <br />
        Check out the docs at&nbsp;
        <a target={`_blank`} rel="noreferrer" href="https://nextjs.org/docs">
          nextjs.org/docs
        </a>
        .
      </p>
    </section>
  );
}
