'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, Ref, MouseEvent } from 'react';

interface SlideItem {
    src: string;
    description: string;
}

export function SliderCard({ src, description }: { src: string; description: string }) {
    return (
        <div className="group shrink-0 w-52 sm:w-62 bg-white pt-2 overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="aspect-square flex items-center justify-center">
                <Image
                    width={200}
                    height={200}
                    src={src}
                    alt={description}
                    className="max-h-full max-w-full object-contain"
                    loading='eager'
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0.3';
                    }}
                />
            </div>
            <div className="p-4 pt-3 group-hover:bg-gray-100 pb-6 px-5 h-full">
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {description}
                </p>
            </div>
        </div>
    );
}

function SliderTrack(
    {
        trackRef,
        thumbRef,
        onClick,
        isDragging,
        thumbWidthPct,
        thumbLeftPct
    }: {
        trackRef: Ref<HTMLDivElement>;
        thumbRef: Ref<HTMLDivElement>;
        onClick: (e: MouseEvent<HTMLDivElement>) => void;
        isDragging: boolean;
        thumbWidthPct: number;
        thumbLeftPct: number;
    }
) {
    return (
        <div>
            <div
                ref={trackRef}
                className="h-2.5 bg-gray-200 hover:bg-gray-300 rounded-full relative cursor-pointer select-none"
                onClick={onClick}
                onMouseDown={(e) => e.preventDefault()}
            >
                <div
                    ref={thumbRef}
                    className={`
                        h-full bg-[#8B1E1E] rounded-full absolute top-0 hover:shadow-md transition-shadow
                        ${isDragging ? 'cursor-grabbing bg-[#a32525]' : 'cursor-grab hover:bg-[#a32525]'}
                    `}
                    style={{
                        width: `${Math.max(thumbWidthPct, 8)}%`,
                        left: `${thumbLeftPct}%`
                    }}
                />
            </div>
        </div>
    );
}

export function Slider({ items }: { items: SlideItem[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [thumbWidthPct, setThumbWidthPct] = useState(0);
    const [thumbLeftPct, setThumbLeftPct] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const updateMetrics = () => {
            const clientWidth = el.clientWidth;
            const scrollWidth = el.scrollWidth;
            const scrollLeft = el.scrollLeft;
            const scrollable = scrollWidth - clientWidth;

            const widthPct = scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 0;
            const leftPct = scrollable > 0 ? (scrollLeft / scrollable) * (100 - widthPct) : 0;

            setThumbWidthPct(widthPct);
            setThumbLeftPct(leftPct);
        };

        updateMetrics();
        el.addEventListener('scroll', updateMetrics, { passive: true });
        const ro = new ResizeObserver(updateMetrics);
        ro.observe(el);

        return () => {
            el.removeEventListener('scroll', updateMetrics);
            ro.disconnect();
        };
    }, []);

    useEffect(() => {
        const thumb = thumbRef.current;
        const track = trackRef.current;
        const scrollEl = scrollRef.current;
        if (!thumb || !track || !scrollEl) return;

        let isDraggingLocal = false;
        let startClientX = 0;
        let startScrollLeft = 0;

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!isDraggingLocal || !track || !scrollEl) return;

            const deltaX = e.clientX - startClientX;

            const trackWidth = track.clientWidth;
            const thumbWidth = (thumbWidthPct / 100) * trackWidth;
            const scrollable = scrollEl.scrollWidth - scrollEl.clientWidth;
            const availableTrack = trackWidth - thumbWidth;

            if (availableTrack <= 0) return;

            const scrollRatio = scrollable / availableTrack;
            let newScrollLeft = startScrollLeft + (deltaX * scrollRatio);

            newScrollLeft = Math.max(0, Math.min(newScrollLeft, scrollable));

            scrollEl.scrollLeft = newScrollLeft;
        };

        const handleMouseUp = () => {
            isDraggingLocal = false;
            setIsDragging(false);
            document.body.style.cursor = '';
        };

        const handleMouseDown = (e: globalThis.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            isDraggingLocal = true;
            setIsDragging(true);
            startClientX = e.clientX;
            startScrollLeft = scrollEl.scrollLeft;

            document.body.style.cursor = 'grabbing';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        thumb.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            thumb.removeEventListener('mousedown', handleMouseDown);
        };
    }, [thumbWidthPct]);

    const handleTrackClick = (e: MouseEvent<HTMLDivElement>) => {
        if (isDragging) return;

        const track = trackRef.current;
        const scrollEl = scrollRef.current;
        if (!track || !scrollEl) return;

        const rect = track.getBoundingClientRect();
        const thumbWidth = (thumbWidthPct / 100) * rect.width;
        const availableTrack = rect.width - thumbWidth;

        if (availableTrack <= 0) return;

        const clickOffset = e.clientX - rect.left;
        const thumbLeftPx = (thumbLeftPct / 100) * rect.width;
        const thumbCenter = thumbLeftPx + thumbWidth / 2;

        if (Math.abs(clickOffset - thumbCenter) < thumbWidth / 2) return;

        const scrollable = scrollEl.scrollWidth - scrollEl.clientWidth;
        const clickRatio = (clickOffset - thumbWidth / 2) / availableTrack;
        const targetScroll = Math.max(0, Math.min(clickRatio * scrollable, scrollable));

        scrollEl.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div
                className="relative"
                style={{
                    maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                }}
            >
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto divide-x border border-gray-200 divide-gray-200 pr-42
                     [&::-webkit-scrollbar]:hidden *:last:border-r *:last:border-gray-200"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items.map((item, idx) => (
                        <SliderCard key={idx} src={item.src} description={item.description} />
                    ))}
                </div>
            </div>

            <div className="pr-42 mt-3">
                <SliderTrack
                    trackRef={trackRef}
                    thumbRef={thumbRef}
                    isDragging={isDragging}
                    onClick={handleTrackClick}
                    thumbWidthPct={thumbWidthPct}
                    thumbLeftPct={thumbLeftPct}
                />
            </div>
        </div>
    );
}

export default function Page() {
    const data: SlideItem[] = [
        { src: '/assets/slide-1.webp', description: 'Набор настольный BESTAR «Amenhotep» из дерева, 8 предметов, двойной лоток, светлая вишня' },
        { src: '/assets/slide-2.webp', description: 'Набор настольный BESTAR «Charon» из дерева, 7 предметов, двойной лоток, красное дерево' },
        { src: '/assets/slide-3.webp', description: 'Набор настольный BESTAR «Charon» из дерева, 7 предметов, двойной лоток, орех' },
        { src: '/assets/slide-4.webp', description: 'Набор настольный BESTAR «Hercules» из дерева, 5 предметов, двойной лоток, красное дерево' },
        { src: '/assets/slide-5.webp', description: 'Набор настольный BESTAR «Hercules» из массива дерева (бук), 5 предметов,' },
        { src: '/assets/slide-6.webp', description: 'Набор подарочный настольный BESTAR «Ares» из дерева, 8 предметов, цвет «орех»' },
    ];

    return (
        <div className="size-full min-h-screen flex justify-center items-center bg-gray-50 p-8">
            <Slider items={data} />
        </div>
    );
}