"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Plus,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers,
  Zap,
  FolderOpen,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MoreHorizontal,
  ExternalLink,
  Mail,
  MessageSquare,
  BookOpen,
  Shield,
  UserCircle,
  CreditCard,
  Globe,
  Key,
} from "lucide-react";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */
type PageId =
  | "dashboard"
  | "projects"
  | "documents"
  | "analytics"
  | "team"
  | "integrations"
  | "settings"
  | "help";

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { id: "projects", label: "Projects", icon: Layers, group: "Overview" },
  { id: "documents", label: "Documents", icon: FileText, group: "Overview" },
  { id: "analytics", label: "Analytics", icon: BarChart3, group: "Overview" },
  { id: "team", label: "Team", icon: Users, group: "Workspace" },
  { id: "integrations", label: "Integrations", icon: Zap, group: "Workspace" },
  { id: "settings", label: "Settings", icon: Settings, group: "Account" },
  { id: "help", label: "Help & Support", icon: HelpCircle, group: "Account" },
];

const GROUPS = ["Overview", "Workspace", "Account"];

/* ================================================================== */
/*  Navigation context                                                */
/* ================================================================== */
const NavContext = React.createContext<{
  currentPage: PageId;
  navigate: (page: PageId) => void;
}>({
  currentPage: "dashboard",
  navigate: () => {},
});

function useNav() {
  return React.useContext(NavContext);
}

/* ================================================================== */
/*  Shared: Page wrapper with fade animation                           */
/* ================================================================== */
function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      key={useNav().currentPage}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex flex-1 flex-col overflow-auto ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  Shared: Section heading helper                                    */
/* ================================================================== */
function PageTitle({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-2 sm:mt-0">{action}</div>}
    </div>
  );
}

/* ================================================================== */
/*  Theme toggle                                                      */
/* ================================================================== */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <Button variant="ghost" size="icon" className="size-8" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

/* ================================================================== */
/*  Sidebar                                                           */
/* ================================================================== */
function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentPage, navigate } = useNav();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <button onClick={() => navigate("dashboard")}>
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Sparkles className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Acme Inc</span>
                  <span className="text-xs text-muted-foreground">Workspace</span>
                </div>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {GROUPS.map((group) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.filter((i) => i.group === group).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={currentPage === item.id}
                      tooltip={item.label}
                      onClick={() => navigate(item.id)}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8">
                <AvatarFallback className="bg-muted text-xs font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@acme.com</span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

/* ================================================================== */
/*  Header                                                            */
/* ================================================================== */
function AppHeader() {
  const { currentPage, navigate } = useNav();
  const currentNav = NAV_ITEMS.find((i) => i.id === currentPage);
  const parentGroup = currentNav?.group;

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="text-muted-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("dashboard");
                }}
              >
                Acme Inc
              </BreadcrumbLink>
            </BreadcrumbItem>
            {parentGroup && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-muted-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {parentGroup}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentNav?.label ?? "Dashboard"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="hidden gap-2 text-muted-foreground sm:flex"
        >
          <Search className="size-3.5" />
          <span className="text-xs">Search...</span>
          <kbd className="pointer-events-none hidden select-none rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground lg:inline-block">
            ⌘K
          </kbd>
        </Button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-500" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Separator orientation="vertical" className="mx-1 h-4" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 px-2">
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px] font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="size-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@acme.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("settings")}>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("help")}>
              <HelpCircle className="mr-2 size-4" />
              Help
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

/* ================================================================== */
/*  PAGE: Dashboard                                                   */
/* ================================================================== */
function DashboardPage() {
  return (
    <PageShell>
      <PageTitle
        title="Dashboard"
        description="Overview of your workspace activity and recent updates."
        action={
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            New Project
          </Button>
        }
      />
      <div className="flex flex-col gap-6 p-6">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Projects", value: "12", change: "+2 this week" },
            { label: "Active Users", value: "48", change: "+5 this month" },
            { label: "Documents", value: "156", change: "+23 this week" },
            { label: "Revenue", value: "$4,280", change: "+12% vs last month" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="size-3 text-emerald-500" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two-column: Recent activity + Quick actions */}
        <div className="grid gap-4 lg:grid-cols-7">
          {/* Recent activity */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Latest updates across your workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Project Marketing Site updated",
                    time: "2 minutes ago",
                    user: "Sarah K.",
                  },
                  {
                    title: "New document Q4 Report created",
                    time: "1 hour ago",
                    user: "John D.",
                  },
                  {
                    title: "Team member Alex M. joined",
                    time: "3 hours ago",
                    user: "System",
                  },
                  {
                    title: "Integration Slack connected",
                    time: "Yesterday",
                    user: "John D.",
                  },
                  {
                    title: "Project Mobile App deployed",
                    time: "2 days ago",
                    user: "Sarah K.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                  >
                    <div className="bg-muted mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full">
                      <Clock className="text-muted-foreground size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.user} &middot; {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>Common tasks to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "New Project", icon: Plus },
                  { label: "Upload File", icon: FileText },
                  { label: "Invite Member", icon: Users },
                  { label: "View Reports", icon: BarChart3 },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="bg-muted/50 hover:bg-muted flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors"
                  >
                    <action.icon className="text-muted-foreground size-5" />
                    <span className="text-xs font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  PAGE: Projects                                                    */
/* ================================================================== */
function ProjectsPage() {
  const { navigate } = useNav();
  return (
    <PageShell>
      <PageTitle
        title="Projects"
        description="Manage and organize all your projects in one place."
        action={
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            New Project
          </Button>
        }
      />
      <div className="flex flex-col gap-6 p-6">
        {/* Filter tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Marketing Site",
                  status: "Active",
                  updated: "2 min ago",
                  members: 4,
                },
                {
                  name: "Mobile App",
                  status: "Active",
                  updated: "1 hour ago",
                  members: 6,
                },
                {
                  name: "API Gateway",
                  status: "Active",
                  updated: "3 hours ago",
                  members: 3,
                },
                {
                  name: "Design System",
                  status: "In Review",
                  updated: "Yesterday",
                  members: 2,
                },
                {
                  name: "Data Pipeline",
                  status: "Active",
                  updated: "2 days ago",
                  members: 5,
                },
                {
                  name: "Legacy Portal",
                  status: "Archived",
                  updated: "1 week ago",
                  members: 3,
                },
              ].map((project) => (
                <Card
                  key={project.name}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{project.name}</CardTitle>
                      <Badge
                        variant={
                          project.status === "Active"
                            ? "default"
                            : project.status === "In Review"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="size-3" />
                      Updated {project.updated}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {Array.from({ length: Math.min(project.members, 3) }).map(
                          (_, i) => (
                            <Avatar
                              key={i}
                              className="ring-background size-6 ring-2"
                            >
                              <AvatarFallback className="text-[9px]">
                                {String.fromCharCode(65 + i)}
                              </AvatarFallback>
                            </Avatar>
                          )
                        )}
                        {project.members > 3 && (
                          <div className="bg-muted ring-background flex size-6 items-center justify-center rounded-full ring-2 text-[9px] font-medium">
                            +{project.members - 3}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="size-7">
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-2 text-center">
                  <FolderOpen className="text-muted-foreground size-8" />
                  <p className="text-sm text-muted-foreground">
                    Showing 5 active projects. Switch to the &quot;All&quot; tab to see everything.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="archived" className="mt-4">
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-2 text-center">
                  <FolderOpen className="text-muted-foreground size-8" />
                  <p className="text-sm text-muted-foreground">
                    1 archived project. Archived projects can be restored at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  PAGE: Documents                                                   */
/* ================================================================== */
function DocumentsPage() {
  return (
    <PageShell>
      <PageTitle
        title="Documents"
        description="Upload, organize, and share your documents."
        action={
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Upload
          </Button>
        }
      />
      <div className="flex flex-col gap-4 p-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Owner</TableHead>
                  <TableHead className="hidden lg:table-cell">Modified</TableHead>
                  <TableHead className="hidden sm:table-cell">Size</TableHead>
                  <TableHead className="pr-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Q4 Revenue Report",
                    type: "Spreadsheet",
                    owner: "John D.",
                    modified: "2 hours ago",
                    size: "1.2 MB",
                  },
                  {
                    name: "Brand Guidelines v3",
                    type: "PDF",
                    owner: "Sarah K.",
                    modified: "Yesterday",
                    size: "4.8 MB",
                  },
                  {
                    name: "Product Roadmap 2026",
                    type: "Presentation",
                    owner: "Alex M.",
                    modified: "3 days ago",
                    size: "8.1 MB",
                  },
                  {
                    name: "API Documentation",
                    type: "Markdown",
                    owner: "John D.",
                    modified: "1 week ago",
                    size: "340 KB",
                  },
                  {
                    name: "Meeting Notes - Sprint 12",
                    type: "Document",
                    owner: "Lisa R.",
                    modified: "1 week ago",
                    size: "128 KB",
                  },
                  {
                    name: "Onboarding Checklist",
                    type: "Document",
                    owner: "HR Team",
                    modified: "2 weeks ago",
                    size: "56 KB",
                  },
                ].map((doc) => (
                  <TableRow key={doc.name} className="cursor-pointer">
                    <TableCell className="pl-4 font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="text-muted-foreground size-4" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {doc.owner}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {doc.modified}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {doc.size}
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <Button variant="ghost" size="icon" className="size-7">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  PAGE: Analytics                                                   */
/* ================================================================== */
function AnalyticsPage() {
  return (
    <PageShell>
      <PageTitle
        title="Analytics"
        description="Track performance metrics and usage trends."
        action={
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 size-4" />
            Export
          </Button>
        }
      />
      <div className="flex flex-col gap-6 p-6">
        {/* Top metrics row */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Page Views", value: "24,521", delta: "+14.2%" },
            { label: "Unique Visitors", value: "3,847", delta: "+8.1%" },
            { label: "Avg. Session", value: "4m 32s", delta: "+2.3%" },
          ].map((m) => (
            <Card key={m.label}>
              <CardHeader className="pb-2">
                <CardDescription>{m.label}</CardDescription>
                <CardTitle className="text-2xl">{m.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex items-center gap-1 text-xs text-emerald-500">
                  <ArrowUpRight className="size-3" />
                  {m.delta} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart placeholder + Top pages table */}
        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Traffic Overview</CardTitle>
              <CardDescription>Daily page views over the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-1.5">
                {Array.from({ length: 30 }).map((_, i) => {
                  const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 25;
                  return (
                    <div
                      key={i}
                      className="bg-primary/15 flex-1 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Top Pages</CardTitle>
              <CardDescription>Most visited pages this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {[
                  { page: "/dashboard", views: "8,432" },
                  { page: "/projects", views: "5,219" },
                  { page: "/documents", views: "3,891" },
                  { page: "/analytics", views: "2,104" },
                  { page: "/settings", views: "1,876" },
                ].map((item, i) => (
                  <div key={item.page} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs font-mono w-4">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{item.page}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.views}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  PAGE: Team                                                        */
/* ================================================================== */
function TeamPage() {
  return (
    <PageShell>
      <PageTitle
        title="Team"
        description="Manage your team members, roles, and permissions."
        action={
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Invite Member
          </Button>
        }
      />
      <div className="flex flex-col gap-4 p-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Member</TableHead>
                  <TableHead className="hidden sm:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Joined</TableHead>
                  <TableHead className="pr-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "John Doe",
                    email: "john@acme.com",
                    initials: "JD",
                    role: "Owner",
                    status: "Active",
                    joined: "Jan 15, 2025",
                  },
                  {
                    name: "Sarah Kim",
                    email: "sarah@acme.com",
                    initials: "SK",
                    role: "Admin",
                    status: "Active",
                    joined: "Feb 3, 2025",
                  },
                  {
                    name: "Alex Martinez",
                    email: "alex@acme.com",
                    initials: "AM",
                    role: "Member",
                    status: "Active",
                    joined: "Mar 21, 2025",
                  },
                  {
                    name: "Lisa Rivera",
                    email: "lisa@acme.com",
                    initials: "LR",
                    role: "Member",
                    status: "Active",
                    joined: "Apr 10, 2025",
                  },
                  {
                    name: "Tom Chen",
                    email: "tom@acme.com",
                    initials: "TC",
                    role: "Viewer",
                    status: "Invited",
                    joined: "Pending",
                  },
                ].map((member) => (
                  <TableRow key={member.email} className="cursor-pointer">
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{member.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          member.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {member.joined}
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <Button variant="ghost" size="icon" className="size-7">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  PAGE: Integrations                                                */
/* ================================================================== */
function IntegrationsPage() {
  const integrations = [
    {
      name: "Slack",
      description: "Send notifications and updates to your Slack channels.",
      connected: true,
      icon: MessageSquare,
    },
    {
      name: "GitHub",
      description: "Link repositories and sync issues with your projects.",
      connected: true,
      icon: Globe,
    },
    {
      name: "Stripe",
      description: "Process payments and manage subscriptions.",
      connected: false,
      icon: CreditCard,
    },
    {
      name: "SendGrid",
      description: "Transactional emails and marketing campaigns.",
      connected: false,
      icon: Mail,
    },
    {
      name: "Auth0",
      description: "Enterprise-grade authentication and identity management.",
      connected: true,
      icon: Shield,
    },
    {
      name: "OpenAI",
      description: "AI-powered features and content generation.",
      connected: false,
      icon: Sparkles,
    },
  ];

  return (
    <PageShell>
      <PageTitle
        title="Integrations"
        description="Connect external tools and services to your workspace."
      />
      <div className="flex flex-col gap-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((intg) => (
            <Card key={intg.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                    <intg.icon className="text-muted-foreground size-5" />
                  </div>
                  <Badge variant={intg.connected ? "default" : "outline"}>
                    {intg.connected ? "Connected" : "Available"}
                  </Badge>
                </div>
                <CardTitle className="text-sm">{intg.name}</CardTitle>
                <CardDescription>{intg.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button
                  variant={intg.connected ? "outline" : "default"}
                  size="sm"
                  className="w-full"
                >
                  {intg.connected ? "Configure" : "Connect"}
                  <ExternalLink className="ml-2 size-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  PAGE: Settings                                                    */
/* ================================================================== */
function SettingsPage() {
  return (
    <PageShell>
      <PageTitle
        title="Settings"
        description="Manage your account preferences and workspace configuration."
      />
      <div className="flex flex-col gap-6 p-6">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and public profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {/* Avatar row */}
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>
                {/* Form fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "First Name", value: "John" },
                    { label: "Last Name", value: "Doe" },
                    { label: "Email", value: "john@acme.com" },
                    { label: "Phone", value: "+1 (555) 000-0000" },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium">{field.label}</label>
                      <div className="border-input bg-muted/50 flex h-9 items-center rounded-md border px-3 text-sm">
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Bio</label>
                  <div className="border-input bg-muted/50 flex h-20 items-start rounded-md border px-3 py-2 text-sm">
                    Product designer and developer. Building things that matter.
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workspace Settings</CardTitle>
                <CardDescription>
                  Configure your workspace name, URL, and default preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {[
                  { label: "Workspace Name", value: "Acme Inc" },
                  { label: "Workspace URL", value: "acme-inc.app.acme.dev" },
                  { label: "Default Timezone", value: "UTC-5 (Eastern)" },
                  { label: "Default Language", value: "English (US)" },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{field.label}</p>
                    </div>
                    <div className="border-input bg-muted/50 flex h-9 w-full items-center rounded-md border px-3 text-sm sm:max-w-xs">
                      {field.value}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-2">
                  <Button size="sm">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Plan</CardTitle>
                  <CardDescription>
                    You are currently on the Pro plan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 flex flex-col gap-3 rounded-lg border p-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold">$29</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <Separator />
                    <ul className="flex flex-col gap-2 text-sm">
                      {[
                        "Up to 10 team members",
                        "50 GB storage",
                        "Priority support",
                        "Advanced analytics",
                        "Custom integrations",
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <div className="bg-primary/10 text-primary flex size-4 items-center justify-center rounded-full">
                            <span className="text-[10px]">✓</span>
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Method</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing history.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex size-10 items-center justify-center rounded-md">
                        <CreditCard className="text-muted-foreground size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Visa ending in 4242
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires 12/2027
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Default</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {[
                    { label: "Current Password", placeholder: "••••••••" },
                    { label: "New Password", placeholder: "••••••••" },
                    { label: "Confirm Password", placeholder: "••••••••" },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium">{field.label}</label>
                      <div className="border-input bg-muted/50 flex h-9 items-center rounded-md border px-3 text-sm">
                        {field.placeholder}
                      </div>
                    </div>
                  ))}
                  <Button size="sm" className="w-fit">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex size-10 items-center justify-center rounded-md">
                        <Key className="text-muted-foreground size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Authenticator App
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Not configured
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex size-10 items-center justify-center rounded-md">
                        <Mail className="text-muted-foreground size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Email Verification
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Enabled — john@acme.com
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  PAGE: Help & Support                                              */
/* ================================================================== */
function HelpPage() {
  return (
    <PageShell>
      <PageTitle
        title="Help & Support"
        description="Find answers, browse documentation, or contact our team."
      />
      <div className="flex flex-col gap-6 p-6">
        {/* Search help */}
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="bg-muted flex size-12 items-center justify-center rounded-xl">
                <Search className="text-muted-foreground size-5" />
              </div>
              <h3 className="text-base font-semibold">How can we help?</h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Search our knowledge base or browse the categories below to find
                what you need.
              </p>
              <div className="border-input bg-muted/50 flex h-10 w-full max-w-md items-center rounded-md border px-3 text-sm text-muted-foreground">
                Search for articles, guides, and more...
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Getting Started",
              description: "Learn the basics and set up your workspace in minutes.",
              articles: 12,
              icon: BookOpen,
            },
            {
              title: "Projects & Tasks",
              description: "Manage projects, assign tasks, and track progress.",
              articles: 18,
              icon: Layers,
            },
            {
              title: "Team Management",
              description:
                "Invite members, manage roles, and configure permissions.",
              articles: 9,
              icon: Users,
            },
            {
              title: "Integrations",
              description:
                "Connect third-party tools and automate your workflows.",
              articles: 15,
              icon: Zap,
            },
            {
              title: "Billing & Plans",
              description:
                "Understand pricing, manage subscriptions, and view invoices.",
              articles: 8,
              icon: CreditCard,
            },
            {
              title: "API Reference",
              description:
                "Explore our REST API documentation and code examples.",
              articles: 24,
              icon: Globe,
            },
          ].map((cat) => (
            <Card
              key={cat.title}
              className="cursor-pointer transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                    <cat.icon className="text-muted-foreground size-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {cat.articles} articles
                  </span>
                </div>
                <CardTitle className="text-sm">{cat.title}</CardTitle>
                <CardDescription>{cat.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Contact support */}
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
              <div className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-xl">
                <MessageSquare className="text-muted-foreground size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold">Still need help?</h3>
                <p className="text-sm text-muted-foreground">
                  Our support team is available 24/7. Average response time is under 2
                  hours.
                </p>
              </div>
              <Button size="sm">Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

/* ================================================================== */
/*  Page router                                                       */
/* ================================================================== */
const PAGE_MAP: Record<PageId, React.FC> = {
  dashboard: DashboardPage,
  projects: ProjectsPage,
  documents: DocumentsPage,
  analytics: AnalyticsPage,
  team: TeamPage,
  integrations: IntegrationsPage,
  settings: SettingsPage,
  help: HelpPage,
};

/* ================================================================== */
/*  Root component with providers                                     */
/* ================================================================== */
function ThemedApp() {
  const [currentPage, setCurrentPage] = React.useState<PageId>("dashboard");

  const navigate = React.useCallback((page: PageId) => {
    setCurrentPage(page);
  }, []);

  const ctx = React.useMemo(
    () => ({ currentPage, navigate }),
    [currentPage, navigate]
  );

  const PageComponent = PAGE_MAP[currentPage];

  return (
    <NavContext.Provider value={ctx}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <AnimatePresence mode="wait">
            <PageComponent key={currentPage} />
          </AnimatePresence>
        </SidebarInset>
      </SidebarProvider>
    </NavContext.Provider>
  );
}

export default function Page() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemedApp />
    </ThemeProvider>
  );
}