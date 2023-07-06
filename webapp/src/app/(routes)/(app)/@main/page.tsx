import { Logo } from "~/app/(components)/logo";

export default function Home() {
  return (
    <section>
      <p id="zero-state">
        <Logo />
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
