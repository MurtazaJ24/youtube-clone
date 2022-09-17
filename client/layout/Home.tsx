import { AppShell, Navbar, Header, Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import UploadVideo from "../components/UploadVideo";
import { useMe } from "../context/me";
import { VideosContextProvider } from "../context/videos";

function HomePageLayout({ children }: { children: ReactNode }) {
  const { user, refetch } = useMe();

  return (
    <VideosContextProvider>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            Side items
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            <Box sx={() => ({ display: "flex" })}>
              <Box sx={() => ({ flex: 1 })}>
                <Image src="/logo.png" alt="Logo" width="100px" height="40px" />
              </Box>
              {!user && (
                <>
                  <Link href="/auth/login">Login</Link>
                  <Link href="/auth/register">Register</Link>
                </>
              )}

              {user && <UploadVideo />}
            </Box>
          </Header>
        }
      >
        {children}
      </AppShell>
    </VideosContextProvider>
  );
}

export default HomePageLayout;
