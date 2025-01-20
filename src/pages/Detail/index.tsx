import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { useParams } from "react-router-dom";

import { Poster, Loader, Error, Section } from "@/common";
import { Casts, Videos, Genre } from "./components";

import { useGetShowQuery } from "@/services/TMDB";
import { useMotion } from "@/hooks/useMotion";
import { mainHeading, maxWidth, paragraph } from "@/styles";
import { cn } from "@/utils/helper";
import { FaPlay } from "react-icons/fa";

const Detail = () => {
  const { category, id } = useParams();
  const [show, setShow] = useState<Boolean>(false);
  const { fadeDown, staggerContainer } = useMotion();

  const {
    data: movie,
    isLoading,
    isFetching,
    isError,
  } = useGetShowQuery({
    category: String(category),
    id: Number(id),
  });

  useEffect(() => {
    document.title =
      (movie?.title || movie?.name) && !isLoading
        ? movie.title || movie.name
        : "Caper Movie";

    return () => {
      document.title = "Caper Movie";
    };
  }, [movie?.title, isLoading, movie?.name]);

  const toggleShow = () => setShow((prev) => !prev);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Something went wrong!" />;
  }

  const {
    title,
    poster_path: posterPath,
    overview,
    name,
    genres,
    videos,
    credits,
  } = movie;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.6) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${posterPath}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  };

  return (
    <>
      <section className="w-full" style={backgroundStyle}>
        <div
          className={`${maxWidth} lg:py-36 sm:py-[136px] sm:pb-28 xs:py-28 xs:pb-12 pt-24 pb-8 flex flex-row lg:gap-12 md:gap-10 gap-8 justify-center `}
        >
          <Poster title={title} posterPath={posterPath} />
          <m.div
            variants={staggerContainer(0.2, 0.4)}
            initial="hidden"
            animate="show"
            className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[520px] font-nunito flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1"
          >
            <m.h2
              variants={fadeDown}
              className={cn(mainHeading, " md:max-w-[420px]")}
            >
              {title || name}
            </m.h2>

            <m.ul
              variants={fadeDown}
              className="flex flex-row items-center  sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap"
            >
              {genres.map((genre: { name: string; id: number }) => {
                return <Genre key={genre.id} name={genre.name} />;
              })}
            </m.ul>

            <m.p variants={fadeDown} className={paragraph}>
              <span>
                {overview.length > 280
                  ? `${show ? overview : `${overview.slice(0, 280)}...`}`
                  : overview}
              </span>
              <button
                type="button"
                className={cn(
                  `font-bold ml-1 hover:underline transition-all duration-300`,
                  overview.length > 280 ? "inline-block" : "hidden"
                )}
                onClick={toggleShow}
              >
                {!show ? "show more" : "show less"}
              </button>
            </m.p>

            <Casts casts={credits?.cast || []} />
          </m.div>
        </div>
      </section>

      <section
        className={cn(
          maxWidth,
          ` flex flex-col lg:gap-16 md:gap-14 sm:gap-12 xs:gap-10 gap-8 lg:py-24 md:py-16 sm:py-12 xs:py-10 py-8`
        )}
      >
        <div className="sm:w-[80%] w-[90%] mx-auto flex flex-col md:gap-2 sm:gap-[6px] xs:gap-1 gap-[2px]">
          <h2 className="dark:text-secColor text-gray-800 font-nunito font-semibold lg:text-[24px] md:text-[22.75px] sm:text-[18.75px] xs:text-[18px] text-[16.75px] mb-1">
            {title || name}
          </h2>
          <div className="w-[100%] lg:h-[480px] md:h-[420px] sm:h-[320px] h-[210px] rounded-md mx-auto shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="trailer"
              width="100%"
              height="100%"
              className="rounded-md"
              allowFullScreen
            />
          </div>
          <div className="mt-[20px] grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 grid-cols-2  gap-3">
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#5aac5aa8] w-full h-[50px] rounded-md text-white text-[14px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 1</span>
            </div>
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[13px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 2</span>
            </div>
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[13px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 3</span>
            </div>
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[13px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 4</span>
            </div>
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[13px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 5</span>
            </div>
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[13px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 6</span>
            </div>
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[13px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 7</span>
            </div>
            <div className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[13px] group hover:text-[#F2CE71] cursor-pointer">
              <FaPlay />
              <span>Episode 22</span>
            </div>
          </div>
        </div>
      </section>

      <Videos videos={videos.results} />

      <Section
        title={`Similar ${category === "movie" ? "movies" : "series"}`}
        category={String(category)}
        className={`${maxWidth}`}
        id={Number(id)}
        showSimilarShows
      />
    </>
  );
};

export default Detail;
