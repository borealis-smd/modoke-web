"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Banner } from "@/components/banner";
import { FeedWrapper } from "@/components/feed-wrapper";
import { SelectSession } from "./select";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuth from "@/lib/hooks/useAuth";
import api from "@/lib/axios";
import { Unit } from "@/types/validators";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { renderIcon } from "./RenderIcon";

import modokeLendo from "../../../public/assets/modokeDog/livro.png";

const RevisionUnit = () => {
  const token = useAuth();
  const userName = useSession().data?.user?.name;

  const [initialUnits, setInitialUnits] = useState<Unit[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const sections = [{ label: "A" }, { label: "AA" }, { label: "AAA" }];

  useEffect(() => {
    if (!token) return;

    const fetchUnits = async () => {
      try {
        const { data: units } = await api.get("/unit/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUnits(units);
        setInitialUnits(units);
      } catch (error) {
        setError("Ocorreu um erro ao carregar as unidades.");
      }
    };

    fetchUnits();
  }, [token]);

  const debouncedSearch = useCallback(
    _.debounce((term) => {
      if (term === "") {
        setUnits(initialUnits);
      } else {
        const filtered = initialUnits.filter((unit) =>
          unit.unit_title.toLowerCase().includes(term.toLowerCase())
        );
        setUnits(filtered);
      }
    }, 300),
    [initialUnits]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleFilterBySection = async (value: string) => {
    const filtered = initialUnits.filter(
      (unit) => unit.section_id === Number(value)
    );
    setSelectedSection(value);
    setUnits(filtered);
  };

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <FeedWrapper>
        <Banner title="Vamos revisar?" variant="revision" name={userName} image={modokeLendo} />

        <div className="flex flex-col lg:flex-row justify-between mt-8 space-y-2 lg:space-y-0">
          <div className="w-full mr-5">
            <Input
              placeholder="Pesquisar por unidade"
              icon={<SearchIcon className="h-5 w-full text-slate-500" />}
              isIconButton={false}
              className="w-full"
              aria-label="Pesquisar por unidade"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <SelectSession
            selectedValue={selectedSection}
            onChange={handleFilterBySection}
          />
        </div>

        <div className="mt-4">
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.length > 0 &&
              units.map((unit) => (
                <div key={unit.unit_id} className="mb-4">
                  <Link href={`/revision/unit/${unit.unit_id}`} passHref>
                    <Button                      
                      variant="default"
                      className="group h-[21.25rem] w-full flex justify-between items-center relative overflow-hidden hover:bg-secondary50/40 border-2 border-slate-300/40 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
                      aria-label={`Acessar a revisão ${unit.unit_title}, do nível ${unit.section_id}`}
                    >
                      <div className="absolute top-6 flex flex-col items-start justify-start space-y-2 z-10">
                        <span className="text-secondary-foreground text-sm font-medium">
                          Sessão:
                        </span>
                        <span className="text-secondary-foreground text-2xl font-semibold">
                          {sections[unit.section_id - 1].label}
                        </span>
                        <span className="text-secondary-foreground text-sm font-medium">
                          Unidade:
                        </span>
                        <span className="text-secondary-foreground text-2xl lg:text-3xl font-semibold">
                          {unit.unit_title}
                        </span>
                      </div>
                      <span className="absolute -bottom-9 lg:-bottom-[80px] right-0 group-hover:z-0 lg:text-[11rem] font-bold leading-none opacity-45 transition-opacity duration-300 group-hover:opacity-100 tracking-tight">
                        {unit.unit_icon && renderIcon(unit.unit_icon)}
                      </span>
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default RevisionUnit;
