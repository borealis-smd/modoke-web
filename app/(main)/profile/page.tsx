"use client";

import { useEffect, useState } from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Bolt from "@mui/icons-material/Bolt";
import Check from "@mui/icons-material/Check";
import { Button } from "@/components/ui/button";
import useAuth from "@/lib/hooks/useAuth";
import { Badge, Certificate, ProgressLesson, User } from "@/types/validators";
import api from "@/lib/axios";

const Profile = () => {
  const token = useAuth();

  const levels = [
    { level: "A", description: "Iniciante" },
    { level: "AA", description: "Intermediário" },
    { level: "AAA", description: "Avançado" },
  ];

  const [user, setUser] = useState<User | null>(null);
  const [level, setLevel] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [lessonNumber, setLessonNumber] = useState(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      const { data: dbUser } = await api.get("/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(dbUser);

      const userLevel = levels.find(
        (_, index) => index + 1 === dbUser?.level_id
      )?.level;
      if (userLevel) setLevel(userLevel);

      const picture = dbUser.avatar_url;
      setProfilePicture(picture);

      const userProgress = (dbUser.xp % 2000) / 20; // divide por 2000 e multiplica por 100
      setProgress(userProgress);
    };

    const fetchLessons = async () => {
      const { data: lessons } = await api.get("/lesson/finished", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const completedLessons = lessons.filter(
        (lesson: ProgressLesson) => lesson.completed_at !== null
      );
      setLessonNumber(completedLessons.length);
    };

    const fetchBadges = async () => {
      const { data: badges } = await api.get("/badge/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBadges(badges);
    };

    const fetchCertificates = async () => {
      const { data: certificates } = await api.get("/certificate/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCertificates(certificates);
    };

    fetchUser();
    fetchLessons();
    fetchBadges();
    fetchCertificates();
  }, [token]);

  return (
    <div className="flex flex-col-reverse lg:flex-row-reverse gap-12 lg:gap-48 ">
      {user && level && progress !== null && (
        <FeedWrapper>
          <section className="flex-1 p-4 lg:p-8">
            <article className="border-2 border-slate-300/40 p-6 lg:p-[1.125rem] rounded-md">
              {/* Profile Header */}
              <header className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-4">
                <div className="w-full lg:w-[14.875rem] h-[13.6875rem] bg-gray-300 rounded-lg">
                  {/* Profile Image */}
                  <Image
                    src={profilePicture || "/assets/default.png"}
                    alt="Perfil de Modoken"
                    width={200}
                    height={220}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Profile Info */}
                <div className="w-full pr-4">
                  <h1 className="text-[1.75rem] lg:text-[2.25rem] font-semibold">
                    {user.first_name} {user.last_name}
                  </h1>
                  <p className="text-gray-500 flex text-lg lg:text-xl mt-2">
                    Nível:
                    <span className="bg-secondary50 text-secondary-foreground px-2 w-[2.4375rem] flex items-center justify-center rounded-md ml-2">
                      {level}
                    </span>
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full lg:w-5/6 mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Progresso</span>
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <Progress
                      value={progress}
                      className="w-full"
                      aria-label="Progresso do perfil"
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex lg:flex-row gap-4 mt-8">
                    <div
                      className="flex items-center justify-around bg-secondary200 px-2 h-[2rem] w-full lg:w-[7.375rem] rounded-md"
                      aria-label="Experiência"
                    >
                      <Bolt aria-hidden="true" />
                      <span className="text-sm lg:text-base">{user.xp} xp</span>
                    </div>
                    <div
                      className="flex items-center justify-around bg-secondary200 px-2 h-[2rem] w-full lg:w-[7.375rem] rounded-md"
                      aria-label="Lições Completas"
                    >
                      <Check aria-hidden="true" />
                      <span className="text-sm lg:text-base">
                        {lessonNumber} lições
                      </span>
                    </div>
                  </div>
                </div>
              </header>
            </article>

            {/* Emblems and Certificates Section */}
            <section
              className="flex flex-col lg:flex-row gap-4 mt-6"
              aria-labelledby="emblems-certificates"
            >
              {/* Emblems */}
              <article
                className="bg-white border-2 border-slate-100 rounded-md flex-1"
                role="region"
                aria-labelledby="emblems-title"
              >
                <h2
                  id="emblems-title"
                  className="mb-4 text-lg font-medium bg-primary p-4 rounded-t-md text-white"
                >
                  Emblemas
                </h2>
                <div className="p-4 lg:p-[1.125rem]">
                  <div className="flex flex-col items-center w-full">
                    {badges.length > 0 ? (
                      <div className="grid grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-300 rounded-full"
                            role="img"
                            aria-label={`Emblema ${i + 1}`}
                            aria-hidden="true"
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center">
                        Nenhum emblema conquistado
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </section>
          </section>
        </FeedWrapper>
      )}
    </div>
  );
};

export default Profile;
