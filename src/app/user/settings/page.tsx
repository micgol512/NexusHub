import { ThemeChanger } from "@/components/shared/ThemeChanger";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserSettingsPage() {
  return (
    <div>
      <Tabs defaultValue="theme">
        <TabsList className="bg-(--background) gap-2 justify-center">
          <h2 className="text-xl font-semibold text-(--primary)">Settings:</h2>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
        <Separator className="bg-(--primary) my-1" />
        <TabsContent value="account">Page in progress...</TabsContent>
        <TabsContent value="theme">
          {" "}
          <p className="text-muted-foreground">Select theme: </p>
          <ThemeChanger />
        </TabsContent>
      </Tabs>
    </div>
  );
}
