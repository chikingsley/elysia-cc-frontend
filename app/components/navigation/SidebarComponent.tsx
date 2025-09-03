"use client";

import type React from "react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineExperiment } from "react-icons/ai";
import { CgFileDocument, CgWebsite } from "react-icons/cg";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaCircle, FaSquareXTwitter } from "react-icons/fa6";
import { GoDatabase } from "react-icons/go";
import { IoIosWarning } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import {
	MdChatBubbleOutline,
	MdOutlineSettingsInputComponent,
} from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { public_path } from "@/app/components/host";
import DataSubMenu from "@/app/components/navigation/DataSubMenu";
import EvalSubMenu from "@/app/components/navigation/EvalSubMenu";
import HomeSubMenu from "@/app/components/navigation/HomeSubMenu";
import { NavUser } from "@/app/components/navigation/NavUser";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import packageJson from "../../../package.json";
import { CollectionContext } from "../contexts/CollectionContext";
import { RouterContext } from "../contexts/RouterContext";
import { SessionContext } from "../contexts/SessionContext";
import { SocketContext } from "../contexts/SocketContext";
import SettingsSubMenu from "./SettingsSubMenu";

const SidebarComponent: React.FC = () => {
	const { socketOnline } = useContext(SocketContext);
	const { changePage, currentPage } = useContext(RouterContext);
	const { collections, loadingCollections } = useContext(CollectionContext);
	const { unsavedChanges } = useContext(SessionContext);

	const [items, setItems] = useState<
		{
			title: string;
			mode: string[];
			icon: React.ReactNode;
			warning?: boolean;
			loading?: boolean;
			onClick: () => void;
		}[]
	>([]);

	useEffect(() => {
		const _items = [
			{
				title: "Chat",
				mode: ["chat"],
				icon: <MdChatBubbleOutline />,
				onClick: () => changePage("chat", {}, true, unsavedChanges),
			},
			{
				title: "Data",
				mode: ["data", "collection"],
				icon: !collections?.some((c) => c.processed === true) ? (
					<IoIosWarning className="text-warning" />
				) : (
					<GoDatabase />
				),
				warning: !collections?.some((c) => c.processed === true),
				loading: loadingCollections,
				onClick: () => changePage("data", {}, true, unsavedChanges),
			},
			{
				title: "Settings",
				mode: ["settings", "elysia"],
				icon: <MdOutlineSettingsInputComponent />,
				onClick: () => changePage("settings", {}, true, unsavedChanges),
			},
			{
				title: "Evaluation",
				mode: ["eval", "feedback", "display"],
				icon: <AiOutlineExperiment />,
				onClick: () => changePage("eval", {}, true, unsavedChanges),
			},
		];
		setItems(_items);
	}, [collections, unsavedChanges]);

	const openNewTab = (url: string) => {
		window.open(url, "_blank");
	};

	return (
		<Sidebar className="fade-in">
			<SidebarHeader>
				<div className={`flex items-center gap-2 w-full justify-between p-2`}>
					<div className="flex items-center gap-2">
						<img
							src={`${public_path}logo.svg`}
							alt="Elysia"
							className="w-5 h-5 stext-primary"
						/>
						<p className="text-sm font-bold text-primary">Elysia</p>
					</div>
					<div className="flex items-center justify-center gap-1">
						{socketOnline ? (
							<FaCircle scale={0.2} className="text-lg pulsing_color w-5 h-5" />
						) : (
							<FaCircle scale={0.2} className="text-lg pulsing w-5 h-5" />
						)}
						<div className="flex flex-col items-end">
							<p className="text-xs text-muted-foreground">
								v{packageJson.version}
							</p>
						</div>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										variant={
											item.mode.includes(currentPage)
												? "active"
												: item.warning
													? "warning"
													: "default"
										}
										onClick={item.onClick}
									>
										<p className="flex items-center gap-2">
											{item.loading ? (
												<FaCircle
													scale={0.2}
													className="text-lg pulsing_color"
												/>
											) : item.warning ? (
												<IoIosWarning className="text-warning" />
											) : (
												item.icon
											)}
											<span>{item.title}</span>
										</p>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<Separator />

				{currentPage === "chat" && <HomeSubMenu />}
				{(currentPage === "data" || currentPage === "collection") && (
					<DataSubMenu />
				)}
				{(currentPage === "eval" ||
					currentPage === "feedback" ||
					currentPage === "display") && <EvalSubMenu />}
				{(currentPage === "settings" || currentPage === "elysia") && (
					<SettingsSubMenu />
				)}
			</SidebarContent>
			<SidebarFooter>
				<Separator />
				<NavUser />
				<Separator />
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="w-full justify-start items-center"
							onClick={() => openNewTab("https://weaviate.github.io/elysia/")}
						>
							<CgFileDocument />
							<span>Documentation</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="w-full justify-start items-center"
							onClick={() => openNewTab("https://github.com/weaviate/elysia")}
						>
							<FaGithub />
							<span>Github</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<img
										src={`${public_path}weaviate-logo.svg`}
										alt="Weaviate"
										className="w-4 h-4"
									/>
									<p>Powered by Weaviate</p>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem
									onClick={() => openNewTab("https://weaviate.io/")}
								>
									<CgWebsite />
									<span>Website</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										openNewTab("https://weaviate.io/product/query-agent")
									}
								>
									<RiRobot2Line />
									<span>Weaviate Query Agent</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => openNewTab("https://newsletter.weaviate.io/")}
								>
									<IoNewspaperOutline />
									<span>Newsletter</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										openNewTab("https://github.com/weaviate/weaviate")
									}
								>
									<FaGithub />
									<span>GitHub</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										openNewTab(
											"https://www.linkedin.com/company/weaviate-io/posts/?feedView=all",
										)
									}
								>
									<FaLinkedin />
									<span>LinkedIn</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => openNewTab("https://x.com/weaviate_io")}
								>
									<FaSquareXTwitter />
									<span>X</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										openNewTab("https://www.youtube.com/@Weaviate")
									}
								>
									<FaYoutube />
									<span>YouTube</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default SidebarComponent;
