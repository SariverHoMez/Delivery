import React from "react";
import { motion } from "framer-motion";

/**
 * FoodTabs – Accessible, animated tabs with TailwindCSS
 * - Keyboard: ArrowLeft/Right, Home/End, Enter/Space
 * - ARIA roles for tabs/tabpanel
 * - Sliding underline indicator (Framer Motion)
 */
export default function FoodTabs() {
    const tabs = [
        { id: "all", label: "เมนูทั้งหมด", items: demoItems("ทั้งหมด") },
        { id: "indian", label: "อาหารอินเดีย", items: demoItems("อินเดีย") },
        { id: "thai", label: "อาหารไทย", items: demoItems("ไทย") },
        { id: "vietnamese", label: "อาหารเวียดนาม", items: demoItems("เวียดนาม") },
        { id: "nearby", label: "อาหารใกล้คุณ", items: demoItems("ใกล้คุณ") },
    ];

    const [active, setActive] = React.useState(tabs[0].id);
    const tabRefs = React.useRef({});

    const onKeyDown = (e) => {
        const idx = tabs.findIndex((t) => t.id === active);
        if (e.key === "ArrowRight") {
            e.preventDefault();
            const next = tabs[(idx + 1) % tabs.length].id;
            setActive(next);
            tabRefs.current[next]?.focus();
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prev = tabs[(idx - 1 + tabs.length) % tabs.length].id;
            setActive(prev);
            tabRefs.current[prev]?.focus();
        }
        if (e.key === "Home") {
            e.preventDefault();
            setActive(tabs[0].id);
            tabRefs.current[tabs[0].id]?.focus();
        }
        if (e.key === "End") {
            e.preventDefault();
            const last = tabs[tabs.length - 1].id;
            setActive(last);
            tabRefs.current[last]?.focus();
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Tablist */}
            <div
                role="tablist"
                aria-label="ประเภทอาหาร"
                className="relative flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-200"
                onKeyDown={onKeyDown}
            >
                {tabs.map((tab) => {
                    const selected = active === tab.id;
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => (tabRefs.current[tab.id] = el)}
                            role="tab"
                            aria-selected={selected}
                            aria-controls={`panel-${tab.id}`}
                            id={`tab-${tab.id}`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(tab.id)}
                            className={`relative px-4 py-2 rounded-xl text-sm font-medium transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              ${selected ? "text-indigo-700" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            {selected && (
                                <motion.span
                                    layoutId="pill"
                                    className="absolute inset-0 rounded-xl bg-indigo-50"
                                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
                {/* Bottom underline */}
                <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200" />
                <motion.div
                    key={active}
                    layoutId="underline"
                    className="absolute bottom-0 h-[3px] rounded-full bg-indigo-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 600, damping: 45 }}
                    style={{
                        // Compute underline position/width based on selected tab button
                        ...(tabRefs.current[active]
                            ? calcUnderline(tabRefs.current[active])
                            : { left: 8, width: 0 }),
                    }}
                />
            </div>

            {/* Panels */}
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    role="tabpanel"
                    id={`panel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    hidden={active !== tab.id}
                    className="mt-6"
                >
                    <motion.div
                        key={tab.id + "-panel"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                    >
                        <Grid items={tab.items} />
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

function Grid({ items }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
                <article
                    key={it.id}
                    className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                        <img
                            src={`https://picsum.photos/seed/${it.id}/640/360`}
                            alt="food"
                            className="h-full w-full object-cover transition group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-gray-900">{it.name}</h3>
                    <p className="text-sm text-gray-600">{it.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-bold">{it.price}.-</span>
                        <button className="rounded-xl bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700">
                            ใส่ตะกร้า
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}

// --- Helpers & demo data ---
function calcUnderline(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.getBoundingClientRect();
    const left = rect.left - parentRect.left + 8; // + padding of tablist
    const width = rect.width - 16; // - padding
    return { left, width };
}

function demoItems(prefix) {
    return Array.from({ length: 6 }).map((_, i) => ({
        id: `${prefix}-${i + 1}`,
        name: `${prefix} เมนู ${i + 1}`,
        desc: "คำอธิบายเมนูแบบสั้น ๆ",
        price: [59, 79, 89, 99, 129, 149][i % 6],
    }));
}
