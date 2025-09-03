"use client";

import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import {
	FaBell,
	FaChevronUp,
	FaCreditCard,
	FaMicrosoft,
	FaSignOutAlt,
	FaStar,
	FaUserCheck,
} from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export function NavUser() {
	const { user, isSignedIn, isLoaded } = useUser();
	const { signOut } = useClerk();
	const { isMobile } = useSidebar();

	// Show loading state while Clerk is loading
	if (!isLoaded) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg" disabled>
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarFallback className="rounded-lg">...</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">Loading...</span>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	// Show sign in button when not signed in
	if (!isSignedIn) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SignInButton mode="modal" forceRedirectUrl="/">
						<SidebarMenuButton
							size="lg"
							className="cursor-pointer hover:bg-sidebar-accent"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarFallback className="rounded-lg bg-primary/10">
									<FaMicrosoft className="h-4 w-4" />
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">Sign In</span>
								<span className="truncate text-xs">with Microsoft</span>
							</div>
						</SidebarMenuButton>
					</SignInButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	// Get user initials for avatar fallback
	const getInitials = () => {
		if (user?.firstName && user?.lastName) {
			return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
		}
		if (user?.firstName) {
			return user.firstName.substring(0, 2).toUpperCase();
		}
		if (user?.username) {
			return user.username.substring(0, 2).toUpperCase();
		}
		return "U";
	};

	const userName =
		user?.fullName || user?.firstName || user?.username || "User";
	const userEmail = user?.primaryEmailAddress?.emailAddress || "";

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={user?.imageUrl}
									alt={userName}
									className="rounded-lg"
								/>
								<AvatarFallback className="rounded-lg">
									{getInitials()}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{userName}</span>
								<span className="truncate text-xs">{userEmail}</span>
							</div>
							<FaChevronUp className="ml-auto h-4 w-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={user?.imageUrl}
										alt={userName}
										className="rounded-lg"
									/>
									<AvatarFallback className="rounded-lg">
										{getInitials()}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{userName}</span>
									<span className="truncate text-xs">{userEmail}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<FaStar className="mr-2 h-4 w-4" />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<FaUserCheck className="mr-2 h-4 w-4" />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<FaCreditCard className="mr-2 h-4 w-4" />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<FaBell className="mr-2 h-4 w-4" />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => signOut()}
							className="text-red-600 focus:text-red-600"
						>
							<FaSignOutAlt className="mr-2 h-4 w-4" />
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
