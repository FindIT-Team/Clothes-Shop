import { Box, HStack, IconButton } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import style from "./index.module.scss";

type Navlink = {
  label: string;
  href: string;
  children?: Navlink[];
};

export default function NavBar({ isSticky }: { isSticky?: boolean }) {
  const navlinks4: Navlink[] =
    "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit Similique Vel Amet Distinctio Perspiciatis Beatae"
      .split(" ")
      .map((v) => ({ label: v, href: "/" }));
  const navlinks3: Navlink[] =
    "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit Similique Vel Amet Distinctio Perspiciatis Beatae"
      .split(" ")
      .map((v) => ({ label: v, href: "/", children: navlinks4 }));
  const navlinks2: Navlink[] =
    "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit Similique Vel Amet Distinctio Perspiciatis Beatae"
      .split(" ")
      .map((v) => ({ label: v, href: "/", children: navlinks3 }));
  const navlinks: Navlink[] = "Женщинам Мужчинам Детям"
    .split(" ")
    .map((v) => ({ label: v, href: "/", children: navlinks2 }));

  const [menuPath, setMenuPath] = useState([0]);
  const menuPathVals: Navlink[] = [];
  menuPathVals[0] = navlinks[menuPath[0]];
  for (let i = 1; i < menuPath.length; i++)
    menuPathVals.push(menuPathVals[i - 1]!.children![menuPath[i]]);

  return (
    <>
      <Box className={style.navbar} position={isSticky ? "sticky" : undefined}>
        <Box
          display={"flex"}
          placeItems={"center"}
          height={"64px"}
          onMouseOver={() => setMenuPath((v) => [v[0]])}
          onFocus={undefined}
        >
          <Box width={"33.3%"} className={style.tabs} borderBottom={"none"}>
            {navlinks.map((v, i) => (
              <Link
                to={v.href}
                className={`${style.tab} ${menuPath[0] == i && style.active}`}
                key={i}
                onMouseOver={() => setMenuPath([i])}
                onFocus={() => setMenuPath([i])}
              >
                {v.label}
              </Link>
            ))}
          </Box>
          <Box width={"33.3%"} justifyContent={"flex-center"}>
            <Logo />
          </Box>
          <HStack width={"33.3%"} justifyContent={"flex-end"}>
            <IconButton aria-label={"Search"}>
              <BiSearch />
            </IconButton>
          </HStack>
        </Box>
        <Box className={style.tabs} justifyContent={"space-between"}>
          {navlinks[menuPath[0]]!.children!.map((v, i) => (
            <Link
              to={v.href}
              className={`${style.tab} ${menuPath[1] == i && style.active}`}
              key={i}
              onMouseOver={() => setMenuPath((v) => [v[0], i, 0])}
              onFocus={() => setMenuPath((v) => [v[0], i, 0])}
            >
              {v.label}
            </Link>
          ))}
        </Box>
      </Box>
      {menuPathVals[1] && menuPathVals[1].children && (
        <Box className={style.navmenu}>
          <Box display={"flex"} flexDir={"column"} flexWrap={"wrap"}>
            {menuPathVals[1].children!.map((v, i) => (
              <Link
                to={v.href}
                className={`${style.tab} ${style.activable}`}
                key={i}
              >
                {v.label}
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.2"
      viewBox="0 0 400 43"
      width="400"
      height="43"
    >
      <style>{".s0 { fill: #000000 }"}</style>
      <path
        id="хуй"
        className="s0"
        aria-label="хуй"
        d="m179.4 25.2c3 0 6.8-1.1 9.4-2.4 0.3-0.2 0.4-0.3 0.4-0.5 0-0.3-0.3-0.5-0.9-0.6-1.3 0.6-3.6 1.2-5.6 1.2-2.4 0-3.3-1.1-3.6-2.3l-0.5-1.7c5.4-2 8.2-3.4 8.9-5.1 0.8-2.1-2.1-2.6-4.4-2.6-1.8 0-3.5 0.6-3.6 1.8 2.2 0 2.9 0.6 2.9 1.1 0 1-2.1 2.4-4.1 3.4l-0.5-1.7c-0.6-2.1-2.1-3-5.8-3-2.7 0-5 0.9-5.8 1.2-1 0.5-0.8 1 0 1.4 2.9-1.2 5.1-0.8 5.3 0.1l1.1 4.1c-3.4 2.4-5.6 3.1-7.7 3.6 0-0.4 0.2-1.2 0.9-1.8-0.7-0.3-1.6-0.4-2.2-0.4-2 0-3.8 0.4-3.8 1.5 0 1.8 1.6 2.7 3.8 2.7 3.1 0 6.9-2 9.5-3.8 1 3 3.2 3.8 6.3 3.8zm8.8-4.6c-1.1 2.2-0.8 4.6 4.5 4.6 2.7 0 5.2-0.8 7.3-2-0.5 0.6-0.8 1.2-1.2 1.8-8.9 1.8-16.2 3.2-16.2 6.3 0 2 3.5 2.9 6.5 2.9 9.6 0 13.5-4.7 16-9.2 3.8-0.7 7.5-1.8 8.5-2.2 0.9-0.4 0.7-0.9-0.1-1.2-1.9 0.7-4.7 1.4-7.7 2.1 0.2-0.3 0.3-0.7 0.5-1l4.6-9.5c-0.7-0.2-1.6-0.3-2.5-0.3-2 0-4 0.4-4.6 1.5l-3.5 7.2c-1.2 0.5-2.5 0.8-4.1 0.8-1.8 0-2.2-0.5-1.8-1.3l3.3-6.9c0.5-0.9-0.6-1.3-2.6-1.3-2.2 0-4.2 0.5-6 1.1-1.1 0.4-0.7 1.2 0 1.4 0.5-0.2 0.8-0.3 1.1-0.3 0.4 0 0.7 0.2 0.5 0.6zm1 11.5c-0.7 0-2.2-0.3-2.2-1.1 0-1.9 4.4-3 10.8-4.4-2.8 3.9-4.9 5.5-8.6 5.5zm23.7-11.5c-0.9 1.8-0.9 4.6 5.1 4.6 3 0 5.7-1.2 7.8-2.7-0.2 2.1 2.4 2.7 5 2.7 2.9 0 6.8-1.1 9.4-2.4 0.3-0.2 0.4-0.4 0.4-0.5 0-0.3-0.3-0.5-0.9-0.6-1.3 0.6-3.6 1.2-5.6 1.2-1.4 0-2.3-0.4-1.6-1.8l3.7-7.9c-0.6-0.2-1.5-0.3-2.5-0.3-1.9 0-4 0.4-4.5 1.5l-3.3 6.8c-1.4 0.7-3 1.2-4.9 1.2-1.6 0-2.3-0.4-1.8-1.4l3.2-6.8c0.5-0.9-0.6-1.3-2.5-1.3-2.3 0-4.2 0.5-6.1 1.1-1.1 0.4-0.7 1.1 0 1.3 0.5-0.2 0.8-0.3 1.1-0.3 0.5 0 0.8 0.3 0.5 0.6zm23.2-12c0.3-0.6-0.9-0.8-1.9-0.8-1.1 1.3-3.3 2-5.1 2-1.4 0-2.4-0.4-2.4-1.1 0-0.3 0.1-0.5 0.3-0.7-0.7-0.2-1.2-0.3-2.1-0.3-3 0-4.5 1-4.5 2.1 0 1.1 1.7 2.3 5.5 2.3 5.7 0 9.9-1.8 10.2-3.5z"
      />
    </svg>
  );
}
