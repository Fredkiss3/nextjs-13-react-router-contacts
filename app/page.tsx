import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <p id="zero-state">
        <Image src="/nextjs.svg" alt="NextJS Logo" width={72} height={16} />
        <br />
        This is a demo for NextJS 13
        <br />
        Check out{" "}
        <a target={`_blank`} href="https://beta.nextjs.org/">
          the docs at beta.nextjs.org
        </a>
        .
      </p>
    </main>
  );
}
