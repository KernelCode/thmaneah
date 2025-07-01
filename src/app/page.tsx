"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import React, { useRef, useState } from "react";
import {
  Home,
  Compass,
  Clock,
  Headphones,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Play,
  CirclePlay,
} from "lucide-react";
// import required modules
import { Scrollbar } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
export default function PodcastPlatform() {
  const [activeSection, setActiveSection] = useState("home");

  const topPodcasts = [
    {
      id: 1,
      title: "بودكاست فنجان",
      host: "بودكاست فنجان",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 2,
      title: "فنجان قهوة",
      host: "Omar Eldeep",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 3,
      title: "فنجان قهوة",
      host: "Mashael saeid",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 4,
      title: "بودكاست فنجان قهوة",
      host: "OUIMA Ahmed Abdelbassest",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 5,
      title: "لم فنجان أمريكانو",
      host: "LuqLounge",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 6,
      title: "يك فنجان قهوة",
      host: "Mohammad",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 7,
      title: "بودكاست فنجان",
      host: "بودكاست فنجان",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 8,
      title: "فنجان قهوة",
      host: "Omar Eldeep",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 9,
      title: "فنجان قهوة",
      host: "Mashael saeid",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 10,
      title: "بودكاست فنجان قهوة",
      host: "OUIMA Ahmed Abdelbassest",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 11,
      title: "لم فنجان أمريكانو",
      host: "LuqLounge",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
    {
      id: 12,
      title: "يك فنجان قهوة",
      host: "Mohammad",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
    },
  ];

  const topEpisodes = [
    {
      id: 1,
      title: "فنجان مسموم",
      podcast: "خيانة",
      description:
        "في هذه الحلقة جيت عن تطوير استخدام البخ في الثقل، ما بين استخدام الحكام له في الثيولت السياسية وحتى استخدام مهاوس المجب له في قتل من يحجموه في سلوك جنايه الستابي، بإمكانك مشاهدة الحلقة من خلال اليوتيوب أو الاستماع لها عبر مشعات البودكاست، ويكرك استخدام وبحين عم مهد البحر ومحمد الستاني...",
      date: "Feb 6, 2023",
      duration: "31 min",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
      bgColor: "bg-teal-600",
    },
    {
      id: 2,
      title: "فنجان قهوة",
      podcast: "Nataloo Talks | ناتالو معرض",
      description:
        "طيوة أو سادة؟ مرتابين أو كولومب؟ أسبريسو أو كابيتشينو؟ الركنة عالية، محصولنا استمع إلى بودكاست سمولك كزيرش علي اخر الآن",
      date: "May 8, 2023",
      duration: "",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
      bgColor: "bg-pink-500",
    },
    {
      id: 3,
      title: "فنجان مسموم",
      podcast: "خيانة",
      description:
        "في هذه الحلقة جيت عن تطوير استخدام البخ في الثقل، ما بين استخدام الحكام له في الثيولت السياسية وحتى استخدام مهاوس المجب له في قتل من يحجموه في سلوك جنايه الستابي، بإمكانك مشاهدة الحلقة من خلال اليوتيوب أو الاستماع لها عبر مشعات البودكاست، ويكرك استخدام وبحين عم مهد البحر ومحمد الستاني...",
      date: "Feb 6, 2023",
      duration: "31 min",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
      bgColor: "bg-teal-600",
    },
    {
      id: 4,
      title: "فنجان قهوة",
      podcast: "Nataloo Talks | ناتالو معرض",
      description:
        "طيوة أو سادة؟ مرتابين أو كولومب؟ أسبريسو أو كابيتشينو؟ الركنة عالية، محصولنا استمع إلى بودكاست سمولك كزيرش علي اخر الآن",
      date: "May 8, 2023",
      duration: "",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
      bgColor: "bg-pink-500",
    },
    {
      id: 5,
      title: "فنجان مسموم",
      podcast: "خيانة",
      description:
        "في هذه الحلقة جيت عن تطوير استخدام البخ في الثقل، ما بين استخدام الحكام له في الثيولت السياسية وحتى استخدام مهاوس المجب له في قتل من يحجموه في سلوك جنايه الستابي، بإمكانك مشاهدة الحلقة من خلال اليوتيوب أو الاستماع لها عبر مشعات البودكاست، ويكرك استخدام وبحين عم مهد البحر ومحمد الستاني...",
      date: "Feb 6, 2023",
      duration: "31 min",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
      bgColor: "bg-teal-600",
    },
    {
      id: 6,
      title: "فنجان قهوة",
      podcast: "Nataloo Talks | ناتالو معرض",
      description:
        "طيوة أو سادة؟ مرتابين أو كولومب؟ أسبريسو أو كابيتشينو؟ الركنة عالية، محصولنا استمع إلى بودكاست سمولك كزيرش علي اخر الآن",
      date: "May 8, 2023",
      duration: "",
      image:
        "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy84MGY2MWYvODBmNjFmMjYtNTAwYi00YWRmLWI2MjItZTk2NGM3Njg2ZmIzLzg3MjAxNmZlLWM0ZmItNGE5My1hNDhlLWMwY2I1ZGZmZjJjNi8zMDAweDMwMDAvaW1hZ2UuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czIyMS92NC9iMi8xYy9kYi9iMjFjZGI0Yi1mMjlkLWI0MTItYjJmMi1iZjIzMWMzZjQ3MjEvbXphXzE5NTMwMjk2MDcyNzE5MDA1NTcuanBnLzYwMHg2MDBiYi5qcGcifQ.eV_rk3Av565BzYE-Gh1itBQQF2B5QmeejQ8ETxX17uk.jpg?width=200&height=200",
      bgColor: "bg-pink-500",
    },
  ];
  const Episodes = ({ episodes }) => {
    const [showType, setShowType] = useState("grid");
    const swiperRef = useRef<SwiperRef | null>(null);

    const handleSlideNext = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
    };

    const handleSlidePrev = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slidePrev();
      }
    };
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            افضل الحلقات لـ <span>فنجان</span>
          </h2>
          <div className="flex gap-2">
            {showType === "scroll" && (
              <div>
                <button
                  onClick={handleSlidePrev}
                  className="p-2 hover:bg-200 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight className="size-5 min-w-5 text-gray-400" />
                </button>
                <button
                  onClick={handleSlideNext}
                  className="p-2 hover:bg-200 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-5 min-w-5 text-gray-400" />
                </button>
              </div>
            )}
            <MenuClick
              items={[
                {
                  label: "عرض الشبكة",
                  onClick: () => {
                    setShowType("grid");
                  },
                },
                {
                  label: "عرض القائمة",
                  onClick: () => {
                    setShowType("list");
                  },
                },
                {
                  label: "عرض التمرير",
                  onClick: () => {
                    setShowType("scroll");
                  },
                },

                {
                  label: "عرض مضغوط",
                  onClick: () => {
                    setShowType("compact");
                  },
                },
              ]}
            />
          </div>
        </div>

        <div className="space-y-2 ">
          {showType === "list" && (
            <>
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} isGrid />
              ))}
            </>
          )}
          {showType === "grid" && (
            <div
              className={`grid ${
                episodes.length > 2
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
                  : "grid-cols-1 sm:grid-cols-2"
              } gap-4`}
            >
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} isGrid />
              ))}
            </div>
          )}
          {showType === "scroll" && (
            <div className="space-y-4">
              <Swiper
                ref={swiperRef}
                modules={[Scrollbar]}
                initialSlide={0}
                spaceBetween={6}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
                scrollbar={{
                  hide: true,
                  draggable: true,
                }}
              >
                {episodes.map((episode) => (
                  <SwiperSlide key={episode.id}>
                    <EpisodeCard episode={episode} isGrid />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {showType === "compact" && (
            <div
              className={`grid ${
                episodes.length > 2
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
                  : "grid-cols-1 sm:grid-cols-2"
              } gap-4`}
            >
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} isGrid isCompact />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };
  const Podcasts = ({ podcasts }) => {
    const [showType, setShowType] = useState("scroll");
    const swiperRef = useRef<SwiperRef | null>(null);

    const handleSlideNext = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
    };

    const handleSlidePrev = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slidePrev();
      }
    };

    return (
      <section className="mb-12 block">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            أفضل البودكاست لـ <span>فنجان</span>
          </h2>
          <div className="flex items-center gap-2">
            {showType === "scroll" && (
              <>
                <button
                  onClick={handleSlidePrev}
                  className="p-2 hover:bg-200 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight className="size-5 min-w-5 text-gray-400" />
                </button>
                <button
                  onClick={handleSlideNext}
                  className="p-2 hover:bg-200 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-5 min-w-5 text-gray-400" />
                </button>
              </>
            )}

            <MenuClick
              items={[
                {
                  label: showType === "grid" ? "عرض التمرير" : "عرض الشبكة",
                  onClick: () => {
                    setShowType(showType === "grid" ? "scroll" : "grid");
                  },
                },
              ]}
            />
          </div>
        </div>
        {showType === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
        {showType === "scroll" && (
          <div className="space-y-4 relative">
            <Swiper
              ref={swiperRef}
              modules={[Scrollbar]}
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 6,
                },
              }}
              initialSlide={0}
              spaceBetween={6}
              scrollbar={{
                hide: true,
                draggable: true,
              }}
            >
              {podcasts.map((podcast) => (
                <SwiperSlide key={podcast.id}>
                  <PodcastCard podcast={podcast} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
    );
  };
  const PodcastCard = ({ podcast }) => (
    <div className="group cursor-pointer bg-100 hover:bg-200 p-2">
      <div
        className={`${podcast.bgColor} rounded-xl  mb-3 aspect-square flex items-center justify-center relative overflow-hidden  transition-transform duration-200`}
      >
        <Image
          src={podcast.image}
          alt={podcast.title}
          width={200}
          height={200}
          className="rounded-lg object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 hover:underline">{podcast.title}</h3>
          <p className="text-gray-400 text-xs">{podcast.host}</p>
        </div>
        <MenuClick />
      </div>
    </div>
  );

  const EpisodeCard = ({ episode, isGrid, isScroll, isCompact }) => (
    <div
      className={`flex gap-4  hover:bg-200 rounded-lg transition-colors group  items-center flex-nowrap ${
        isScroll && "w-fit"
      }`}
    >
      <div
        className={`rounded-lg ${
          isCompact ? "size-15 sm:size-20" : "size-25 sm:size-30"
        }  flex-shrink-0 flex items-center justify-center relative overflow-hidden group`}
      >
        <Image
          src={episode.image}
          alt={episode.title}
          width={isCompact ? 100 : 150}
          height={isCompact ? 100 : 150}
          className="rounded-lg object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/70 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <CirclePlay className="size-12 text-white hover:text-pink-400 transition-colors" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/episode/${episode.id}`}>
          <h3 className="text-white font-medium text-base mb-1 hover:underline text-nowrap">{episode.title}</h3>
        </Link>
        <Link href={`/podcast/${episode.id}`}>
          <h4 className="text-pink-400 text-sm font-medium mb-2 hover:underline">{episode.podcast}</h4>
        </Link>
        {!isGrid && (
          <div className="hidden sm:flex">
            <p className="text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed  overflow-hidden ">
              {episode.description}
            </p>
          </div>
        )}
        {!isCompact && (
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span>{episode.date}</span>
            {episode.duration && (
              <>
                <span>•</span>
                <span>{episode.duration}</span>
              </>
            )}
          </div>
        )}
      </div>
      <div className={`flex-shrink-0 gap-3 flex items-start flex-col pt-2 relative ${isGrid && "self-baseline"}`}>
        <MenuClick
          items={[
            {
              label: "تشغيل الحلقة",
              onClick: () => {},
            },
            {
              label: "الذهاب إلى البودكاست",
              href: `/podcast/${episode.id}`,
            },
            {
              label: "الذهاب إلى الحلقة",
              href: `/episode/${episode.id}`,
            },

            {
              label: "تنزيل الحلقة",
              onClick: () => {},
            },
          ]}
        />

        {!isGrid && (
          <button className="transition-opacity cursor-pointer">
            <CirclePlay className="w-8 h-8 text-white hover:text-pink-400 transition-colors" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-100 min-h-screen text-white" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-200 fixed bg-100 z-50 w-full">
        <div className="flex items-center gap-2 lg:gap-4">
          <Image
            //Thmanyah_Logo.svg
            src="/Thmanyah_Logo.svg"
            alt="Thmanyah Logo"
            width={40}
            height={40}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </div>

        <div className="flex-grow flex  mx-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث في اكثر من 70 مليون بودكاتس وحلقات "
              className="w-full bg-100 border border-gray-700 rounded-full px-10 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:block px-4 py-2 bg-white hover:bg-gray-300 text-black rounded-full text-sm font-medium transition-colors cursor-pointer">
            دخول
          </button>
          <button className="hidden sm:block px-4 py-2 bg-white hover:bg-gray-300 text-black rounded-full text-sm font-medium transition-colors cursor-pointer">
            تسجيل
          </button>
          <MenuClick
            items={[
              {
                label: "إعدادات",
                onClick: () => console.log("Settings clicked"),
              },
              {
                label: "تسجيل الخروج",
                onClick: () => console.log("Logout clicked"),
              },
            ]}
          />
        </div>
      </header>

      <div className="flex ">
        {/* Sidebar */}
        <aside className=" bg-200 border-r border-200 p-2 sm:p-4 sm:w-60 hidden sm:block sticky min-h-screen ">
          <div className="fixed mt-15 z-10">
            <nav className="space-y-2 max-w-[19rem]">
              <button
                onClick={() => setActiveSection("home")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-right transition-colors ${
                  activeSection === "home"
                    ? "bg-200 text-white"
                    : "text-gray-400 hover:text-white hover:bg-100 cursor-pointer"
                }`}
              >
                <Home className="size-5 min-w-5 " />
                <span className="hidden sm:block">الواجهة</span>
              </button>
              <button
                onClick={() => setActiveSection("discover")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-right transition-colors cursor-pointer ${
                  activeSection === "discover" ? "bg-100 text-white" : "text-gray-400 hover:text-white hover:bg-200"
                }`}
              >
                <Compass className="min-w-5 size-5" />
                <span className="hidden sm:block">استكشف</span>
              </button>
            </nav>

            <div className="mt-0 lg:mt-8 ">
              <h3 className="text-gray-400 text-sm font-medium mb-4 px-3 hidden sm:block">خاص بك</h3>
              <nav className="space-y-2 max-w-[19rem]">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-right text-gray-400 hover:text-white hover:bg-100 transition-colors cursor-pointer">
                  <div className="size-5 min-w-5 bg-gray-600 rounded"></div>
                  <span className="hidden sm:block">قائمتك</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-right text-gray-400 hover:text-white hover:bg-200 transition-colors cursor-pointer">
                  <Headphones className="size-5 min-w-5 " />
                  <span className="hidden sm:block">البودكاسات المفضلة</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-right text-gray-400 hover:text-white hover:bg-200 transition-colors cursor-pointer">
                  <Clock className="size-5 min-w-5 " />
                  <span className="hidden sm:block">اخر ماتم تشغيلة</span>
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-2 sm:p-6 block mt-15">
          <Podcasts podcasts={topPodcasts} />

          <Episodes episodes={topEpisodes} />
        </main>
      </div>
    </div>
  );
}

const MenuClick = ({ items }: { items: { label: string; href?: string; onClick?: () => void }[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".menu-container")) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative menu-container">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 hover:bg-200 rounded-full transition-colors cursor-pointer"
      >
        <MoreHorizontal className="size-5 min-w-5 text-gray-400" />
      </button>
      {isMenuOpen && (
        <div className="absolute left-0 w-max top-8 text-start  bg-100 border border-200 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {items?.map((item, index) =>
              item.href ? (
                <li
                  key={index}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-200 cursor-pointer"
                >
                  <Link
                    href={item.href}
                    className="block  py-2 text-gray-400 hover:text-white hover:bg-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-200 cursor-pointer"
                >
                  {item.label}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
