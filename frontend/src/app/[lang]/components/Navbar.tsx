"use client"
import React, { useState } from 'react';
import NextLink from 'next/link';
import Logo from "./Logo"; // Assuming correct import and implementation
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { navigationMenuTriggerStyle } from "@/ui-components/ui/navigation-menu";
import {

  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/ui-components/ui/navigation-menu";

interface NavLink {
  id: number;
  url: string;
  newTab?: boolean;
  text: string;
  submenu?: {
    id: number;
    url: string;
    text: string;
  }[];
}

interface NavbarProps {
  links: NavLink[];
  logoUrl: string | null;
  logoText: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ links, logoUrl, logoText }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const renderSubMenu = (submenu: NavLink['submenu']) => (
        <NavigationMenuContent className="absolute top-full left-0 w-full sm:w-auto">
            <ul className="m-0 grid list-none gap-[10px] p-[22px] sm:w-[500px] sm:grid-cols-[repeat(auto-fill, minmax(200px, 1fr))]">
                {submenu?.map((item) => (
                    <ListItem key={item.id} href={item.url} title={item.text} />
                ))}
            </ul>
        </NavigationMenuContent>
    );

    return (
        <NavigationMenu.Root className="relative z-10">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Logo src={logoUrl}>
                        {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
                    </Logo>
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                    {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>
            <NavigationMenuList className="hidden md:flex m-0 list-none">
                {links.map((link) => (
                    <NavigationMenuItem key={link.id}>
           
                        <NavigationMenuTrigger className="text-violet11 hover:bg-violet3 focus:shadow-violet7 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            {link.text}
                            {link.submenu ? (
                                <CaretDownIcon
                                    className="text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                                    aria-hidden
                                />
                            ) : null}
                        </NavigationMenuTrigger>
                        {link.submenu ? renderSubMenu(link.submenu) : null}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu.Root>
    );
};

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(({ className, title, href }, ref) => (
  <li>
      <NextLink href={href} passHref>
          <a
              // Here we assign the forwarded ref to the <a> element
              ref={ref}
              className={classNames(
                  'focus:shadow-[0_0_0_2px] focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors',
                  className
              )}
          >
              <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">{title}</div>
          </a>
      </NextLink>
  </li>
));

ListItem.displayName = "ListItem";

export default Navbar;



// 
// "use client"
// import React, { useState } from 'react';
// import NextLink from 'next/link';
// import Logo from "./Logo"; // Assuming correct import and implementation
// import { Dialog, Transition } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import { CaretDownIcon } from '@radix-ui/react-icons';

// interface NavLink {
//   id: number;
//   url: string;
//   newTab?: boolean;
//   text: string;
//   submenu?: NavLink[];
// }

// const CustomLink: React.FC<{ url: string; text: string; }> = ({ url, text }) => {
//   return (
//     <NextLink href={url} passHref>
//       <a className="NavigationMenuLink">
//         {text}
//       </a>
//     </NextLink>
//   );
// };

// const Navbar: React.FC<{ links: NavLink[]; logoUrl: string | null; logoText: string | null; }> = ({ links, logoUrl, logoText }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <NavigationMenu.Root className="relative z-10">
//       <div className="flex items-center justify-between p-4">
//       <Logo src={logoUrl}>
//           {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
//         </Logo>
//         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
//           {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//         </button>
//         <NavigationMenu.List className="hidden md:flex gap-4">
//           {links.map((link) => (
//             <NavigationMenu.Item key={link.id}>
//               {!link.submenu ? (
//                 <CustomLink url={link.url} text={link.text} />
//               ) : (
//                 <>
//                   <NavigationMenu.Trigger className="flex items-center gap-1 text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
//                     {link.text} <CaretDownIcon />
//                   </NavigationMenu.Trigger>
//                   <NavigationMenu.Content className="absolute mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                     <div className="py-1">
//                       {link.submenu.map((subLink) => (
//                         <CustomLink key={subLink.id} url={subLink.url} text={subLink.text} />
//                       ))}
//                     </div>
//                   </NavigationMenu.Content>
//                 </>
//               )}
//             </NavigationMenu.Item>
//           ))}
//         </NavigationMenu.List>
//         <Transition show={mobileMenuOpen} enter="transition ease-out duration-300 transform" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-200 transform" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
//           <Dialog as="div" className="fixed inset-0 z-20 flex md:hidden" onClose={() => setMobileMenuOpen(false)}>
//             <Dialog.Panel className="w-full max-w-sm transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
//               <NavigationMenu.List className="flex flex-col gap-4">
//                 {links.map((link) => (
//                   <NavigationMenu.Item key={link.id}>
//                     {!link.submenu ? (
//                       <CustomLink url={link.url} text={link.text} />
//                     ) : (
//                       <div className="flex flex-col">
//                         <span className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">{link.text}</span>
//                         {link.submenu.map((subLink) => (
//                           <CustomLink key={subLink.id} url={subLink.url} text={subLink.text} />
//                         ))}
//                       </div>
//                     )}
//                   </NavigationMenu.Item>
//                 ))}
//               </NavigationMenu.List>
//             </Dialog.Panel>
//           </Dialog>
//         </Transition>
//       </div>
//     </NavigationMenu.Root>
//   );
// };

// export default Navbar;




// "use client";
// import Logo from "./Logo";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Dialog } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { useState } from "react";

// interface NavLink {
//   id: number;
//   url: string;
//   newTab: boolean;
//   text: string;
// }

// interface MobileNavLink extends NavLink {
//   closeMenu: () => void;
// }

// function NavLinkComponent({ url, text }: NavLink) {
//   const path = usePathname();

//   return (
//     <li className="flex justify-center">
//       {/* Updated to include legacyBehavior prop */}
//       <Link href={url} legacyBehavior>
//         <a className={`mx-4 py-2 text-sm font-medium ${path === url ? "border-b-2 border-violet-400 dark:text-violet-400" : "border-transparent"} hover:text-violet-500`}>
//           {text}
//         </a>
//       </Link>
//     </li>
//   );
// }

// function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
//   const path = usePathname();
//   const handleClick = () => {
//     closeMenu();
//   };

//   return (
//     <div onClick={handleClick} className="flex justify-center">
//       {/* Updated to include legacyBehavior prop */}
//       <Link href={url} legacyBehavior>
//         <a className={`block rounded-lg px-3 py-2 text-sm font-medium leading-7 text-gray-100 hover:bg-gray-900 ${path === url ? "dark:text-violet-400" : ""}`}>
//           {text}
//         </a>
//       </Link>
//     </div>
//   );
// }

// export default function Navbar({ links, logoUrl, logoText, }: { links: Array<NavLink>; logoUrl: string | null; logoText: string | null; }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const closeMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   return (
//     <div className="p-7 bg-white dark:text-gray-900 border-b border-gray-200">
//       <div className="container flex justify-between items-center h-16 mx-auto px-0 sm:px-6">
//         {logoUrl && (
//           <Logo src={logoUrl}>
//             {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
//           </Logo>
//         )}

//         <ul className="items-stretch hidden space-x-3 lg:flex justify-center flex-1">
//           {links.map((item: NavLink) => (
//             <NavLinkComponent key={item.id} {...item} />
//           ))}
//         </ul>

//         <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
//           <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
//             <div className="flex items-center justify-between">
//               <a href="#" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Close menu</span>
//                 {logoUrl && <img className="h-8 w-auto" src={logoUrl} alt="" />}
//               </a>
//               <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-900" onClick={closeMenu}>
//                 <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//               </button>
//             </div>
//             <div className="mt-6">
//               <div className="-my-6 divide-y divide-gray-200/10">
//                 <div className="space-y-6 py-6">
//                   {links.map((item) => (
//                     <MobileNavLink key={item.id} closeMenu={closeMenu} {...item} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </Dialog.Panel>
//         </Dialog>

//         <button className="p-4 lg:hidden" onClick={() => setMobileMenuOpen(true)}>
//           <Bars3Icon className="h-7 w-7 text-gray-900" aria-hidden="true" />
//         </button>
//       </div>
//     </div>
//   );
// }
