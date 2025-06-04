"use client";

import { useState, useEffect } from "react";
import { Partner } from "@/types/Partner";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Page() {
    const [partner, setPartner] = useState<Partner | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchPartner();
    }, []);

    async function fetchPartner() {
        try {
            const res = await api({
                url: `/partners`,
            });
            console.log(res.data);
            const partners = res.data.items;

            if (Array.isArray(partners) && partners.length > 0) {
                const firstPartner = partners[0];
                setPartner(firstPartner);
                document.title = firstPartner.name;

                const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
                if (favicon && firstPartner.logoUrl) {
                    favicon.href = firstPartner.logoUrl;
                }

                if (firstPartner.slug) {
                    router.push(`/promo/${firstPartner.slug}`);
                } else {
                    console.warn("Partner has no slug for redirect");
                }
            } else {
                console.error("No partner data found in items array");
            }
        } catch (error) {
            console.error("Error fetching partner:", error);
        }
    }

    if (!partner) {
        return (
          <></>
        );
    }

    return null;
}