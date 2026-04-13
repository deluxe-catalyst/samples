"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./styles.module.css";
import { cn } from "@/utils/cn";

export default function Page() {
    const constraintsRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={constraintsRef} className="pt-20 overflow-hidden min-h-screen">
            <div className={cn(styles.text, 'width-limiter')}>
                <h1>Перетащите картинки в неудобное место</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem enim maxime accusamus praesentium at exercitationem eligendi consequuntur magni fuga qui voluptates rerum nemo vitae, incidunt pariatur nobis eos natus adipisci quaerat temporibus quia maiores ab repellendus dolorum. Excepturi architecto veritatis nostrum adipisci dolor? At excepturi qui quo, quam, quod error esse dolores cum tempora officia, libero sint facere a? Quo eveniet nulla modi molestiae facere quaerat corporis quisquam suscipit? Voluptatibus minus laborum dolores ullam maxime aut consequatur, ipsa veritatis doloremque fugit animi alias eum sapiente voluptate numquam amet totam possimus commodi molestias nam laudantium reiciendis sunt rem ad! Amet quisquam voluptatum, cupiditate mollitia numquam modi ullam, consequuntur minima nemo doloribus ab inventore accusamus esse maiores. Quibusdam obcaecati deleniti nisi expedita molestiae illum illo reiciendis, eveniet voluptate sequi blanditiis porro tempora delectus hic non minus consectetur voluptatibus nemo dolore! Iste, optio voluptatum! Quo delectus sit illum! Quos recusandae reiciendis mollitia a?
                </p>

                <motion.div
                    drag
                    dragMomentum
                    dragElastic={0.1}
                    dragConstraints={constraintsRef}
                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                    className={styles.floatLeft}
                >
                    <Image
                        src="/assets/text-image-1.webp"
                        alt="Draggable 1"
                        width={300}
                        height={300}
                        className={styles.image}
                    />
                </motion.div>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias at perferendis cum. Nesciunt corporis pariatur veniam odit excepturi aliquam minima. Autem quis numquam assumenda suscipit, rerum magni placeat asperiores eius debitis molestiae sequi provident, ex, eveniet animi? Voluptas quos reprehenderit repellat atque officiis odio cumque consequatur eligendi. Libero error animi aliquam mollitia? Ut deleniti nisi cumque magni ipsa odit fuga hic, quia doloribus debitis veniam porro adipisci mollitia aperiam voluptatibus libero, recusandae minus at repellat alias praesentium? Doloremque tenetur cumque illum vero fugiat recusandae, soluta neque quo voluptatibus aliquid tempore voluptate in ipsum. Laborum incidunt quod sint atque modi magni?
                </p>
                <motion.div
                    drag
                    dragMomentum
                    dragElastic={0.1}
                    dragConstraints={constraintsRef}
                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                    className={styles.floatRight}
                >
                    <Image
                        src="/assets/text-image-2.webp"
                        alt="Draggable 2"
                        width={300}
                        height={150}
                        className={styles.image}
                    />
                </motion.div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, dolore aliquid repudiandae alias quod atque facilis, necessitatibus repellendus voluptates, nisi quis. Sint natus officiis quam! Doloribus expedita labore ullam aspernatur! Sit aut distinctio ut dolores iure facere id error, illum ab! Itaque, eligendi consequuntur nobis maxime harum modi nesciunt quos.
                </p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores doloremque a minima doloribus, eveniet accusantium numquam repellat nemo reprehenderit, mollitia dignissimos sint provident qui tempore eos alias eius! Voluptatibus alias corporis quia maiores distinctio molestiae explicabo, quibusdam totam doloribus deleniti. Repudiandae ea qui nostrum dignissimos error, dolore animi nobis impedit necessitatibus! Ipsa cum aliquam veritatis necessitatibus similique sunt placeat iure impedit magnam quas provident aliquid vel, et debitis voluptatem enim ab culpa! Perspiciatis hic facilis consectetur doloribus error earum tenetur nostrum soluta quo fuga vero saepe ut, dolorem, praesentium sequi dicta illo optio illum alias iure quia! Sint quos et eos molestiae recusandae laborum. Similique aperiam laborum maxime excepturi voluptatibus. Voluptatibus exercitationem ab ipsam velit perferendis optio, itaque illum officia incidunt vero nesciunt dolore laudantium iusto nemo excepturi! Perferendis possimus, dolorum odit nihil impedit, voluptas ducimus inventore nisi expedita reiciendis voluptatem cum ipsam molestiae, quidem consequatur! Deleniti mollitia iure quos adipisci aliquam id nemo ullam magnam at dignissimos, asperiores ratione fugiat voluptate vel ipsa sunt, libero error? Facilis natus reprehenderit quam soluta officiis aliquam autem? Ullam iste vitae voluptatibus enim sit in similique et, dicta amet dolor molestias, reiciendis doloremque asperiores voluptas, earum obcaecati ea natus aut? Ullam, ducimus dolores!
                </p>
            </div>
        </div>
    );
}