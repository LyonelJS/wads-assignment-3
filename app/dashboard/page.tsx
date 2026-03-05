import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserCircle, LayoutDashboard } from "lucide-react";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import LogoutButton from "@/components/logout-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  // If no session cookie, send to login
  if (!session) redirect("/login");

  let decodedToken;
  let userData = null;

  try {
    // Verify the session token using the Admin SDK
    decodedToken = await adminAuth.verifyIdToken(session, true);

    // Fetch user-specific data from Firestore
    const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    
    if (userDoc.exists) {
      userData = userDoc.data();
    }
  } catch (error) {
    // If token is invalid or expired, redirect to login
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-muted/40 font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">ToDo App</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/account" className="gap-2">
                <UserCircle className="h-5 w-5" />
                Account
              </Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto py-10 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* User Credentials */}
          <Card className="col-span-1 shadow-sm sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Display Name</span>
                <span className="text-base font-medium">{userData?.name || "Not set"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Email Address</span>
                <span className="text-base">{decodedToken.email}</span>
              </div>
              <Button variant="outline" size="sm" asChild className="w-full mt-2">
                <Link href="/account">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Welcome Card */}
          <Card className="col-span-1 shadow-sm sm:col-span-2">
            <CardHeader>
              <CardTitle>Welcome back, {userData?.name?.split(' ')[0] || "User"}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is your private dashboard. You are successfully authenticated via 
                <strong> Firebase {userData?.authProvider || "Auth"}</strong>.
              </p>
              <div className="mt-6 rounded-lg bg-primary/5 p-4 border border-primary/10">
                <p className="text-sm font-medium text-primary">
                  Ready to manage your tasks? Click the Account button to update your credentials.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}