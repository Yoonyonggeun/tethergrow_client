/**
 * Footer Component
 *
 * A responsive footer that displays copyright information and legal links.
 * This component appears at the bottom of every page in the application and
 * provides essential legal information and copyright notice.
 *
 * Features:
 * - Responsive design that adapts to different screen sizes
 * - Dynamic copyright year that automatically updates
 * - Links to legal pages (Privacy Policy, Terms of Service)
 * - View transitions for smooth navigation to legal pages
 */
import { Link } from "react-router";

/**
 * Footer component for displaying copyright information and legal links
 *
 * This component renders a responsive footer that adapts to different screen sizes.
 * On mobile, it displays the legal links above the copyright notice, while on desktop,
 * it displays them side by side with the copyright on the left and links on the right.
 *
 * @returns A footer component with copyright information and legal links
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function Footer() {
  return (
    <footer className="text-muted-foreground mt-auto flex items-center justify-between border-t p-4 text-sm md:py-5">
      <div className="mx-auto h-full w-full max-w-screen-2xl gap-2.5 md:flex md:items-end md:justify-between md:gap-0">
        {/* Copyright notice - appears second on mobile, first on desktop */}
        <div className="flex flex-col gap-4">
          <Link to="/">
            <img
              src="/images/logo/tethergrow_logo_dark_mode_full.svg"
              alt="logo"
              className="h-6"
            />
          </Link>
          <div>
            {/* 고객 센터 이메일 */}
            <p>이메일 : tethergrow25@gmail.com</p>
            {/* sns : instagram, threads, telegram, naver blog*/}
            <div className="flex items-center gap-4 mt-4">
              <Link
                to="https://www.instagram.com/tethergrow_ai"
                target="_blank"
              >
                <img
                  src="/images/sns/instagram.svg"
                  alt="instagram"
                  className="size-6"
                />
              </Link>
              <Link to="https://www.threads.com/@tethergrow_ai" target="_blank">
                <img
                  src="/images/sns/threads.png"
                  alt="threads"
                  className="size-5"
                />
              </Link>
              <Link to="https://t.me/tethergrow_ai" target="_blank">
                <img
                  src="/images/sns/telegram.svg"
                  alt="telegram"
                  className="size-6"
                />
              </Link>
              <Link to="https://x.com/tethergrow_ai" target="_blank">
                <img
                  src="/images/sns/logo.svg"
                  alt="twitter"
                  className="size-4.5"
                />
              </Link>
            </div>
          </div>
          <p>
            Copyright {new Date().getFullYear()} TetherGrow All Rights Reserved.
          </p>
        </div>

        {/* Legal links - appears first on mobile, second on desktop */}
        {/* <div className="flex gap-10 mt-6 *:underline md:order-none md:mt-0">
          <Link to="/legal/privacy-policy" viewTransition>
            개인정보 처리방침
          </Link>
          <Link to="/legal/terms-of-use" viewTransition>
            이용약관
          </Link>
        </div> */}
      </div>
    </footer>
  );
}
