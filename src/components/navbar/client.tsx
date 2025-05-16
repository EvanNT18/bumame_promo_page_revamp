import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center">
                        <Image src="/logo/logo-bni.png" alt="Logo" width={100} height={100} className="h-full w-full" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
