--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELLED'
);


ALTER TYPE public."BookingStatus" OWNER TO postgres;

--
-- Name: OfflinePaymentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OfflinePaymentStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'CANCELED'
);


ALTER TYPE public."OfflinePaymentStatus" OWNER TO postgres;

--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionType" AS ENUM (
    'REGISTRATION_FEE',
    'BOOKING_PAYMENT',
    'COMMISSION',
    'REFUND',
    'OFFLINE_BOOKING'
);


ALTER TYPE public."TransactionType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AdhaarCardDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AdhaarCardDetails" (
    id integer NOT NULL,
    "adhaarNumber" text NOT NULL,
    "adhaarCardFile" text NOT NULL,
    "adminId" integer NOT NULL
);


ALTER TABLE public."AdhaarCardDetails" OWNER TO postgres;

--
-- Name: AdhaarCardDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AdhaarCardDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AdhaarCardDetails_id_seq" OWNER TO postgres;

--
-- Name: AdhaarCardDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AdhaarCardDetails_id_seq" OWNED BY public."AdhaarCardDetails".id;


--
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    "Dob" timestamp(3) without time zone,
    password text NOT NULL,
    "accountType" text DEFAULT 'Admin'::text NOT NULL,
    address jsonb NOT NULL,
    "profileImage" text,
    "resetPasswordExpires" timestamp(3) without time zone,
    "phoneNumber" character varying(10) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "fullName" text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "passportPhoto" text
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Admin_id_seq" OWNER TO postgres;

--
-- Name: Admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;


--
-- Name: Amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Amenities" (
    id integer NOT NULL,
    "libraryId" integer NOT NULL,
    amenities jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public."Amenities" OWNER TO postgres;

--
-- Name: Amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Amenities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Amenities_id_seq" OWNER TO postgres;

--
-- Name: Amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Amenities_id_seq" OWNED BY public."Amenities".id;


--
-- Name: App; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."App" (
    id integer NOT NULL,
    "Banner" text[]
);


ALTER TABLE public."App" OWNER TO postgres;

--
-- Name: App_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."App_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."App_id_seq" OWNER TO postgres;

--
-- Name: App_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."App_id_seq" OWNED BY public."App".id;


--
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    id integer NOT NULL,
    "libraryId" integer NOT NULL,
    "userId" integer NOT NULL,
    approved boolean DEFAULT false NOT NULL,
    "bookedSeat" jsonb NOT NULL,
    "bookingDate" timestamp(3) without time zone NOT NULL,
    "bookingFinalDate" timestamp(3) without time zone,
    "bookingPeriod" integer DEFAULT 1 NOT NULL,
    "bookingStatus" public."BookingStatus" DEFAULT 'PENDING'::public."BookingStatus" NOT NULL,
    "finalPrice" double precision NOT NULL,
    "initialPrice" double precision NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    "roomNo" integer NOT NULL,
    "timeSlotDetails" jsonb,
    "timeStamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "transactionDetails" jsonb
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: BookingFriend; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BookingFriend" (
    id integer NOT NULL,
    "bookingId" integer NOT NULL,
    "friendId" integer NOT NULL
);


ALTER TABLE public."BookingFriend" OWNER TO postgres;

--
-- Name: BookingFriend_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BookingFriend_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BookingFriend_id_seq" OWNER TO postgres;

--
-- Name: BookingFriend_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BookingFriend_id_seq" OWNED BY public."BookingFriend".id;


--
-- Name: Booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Booking_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Booking_id_seq" OWNER TO postgres;

--
-- Name: Booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Booking_id_seq" OWNED BY public."Booking".id;


--
-- Name: Distance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Distance" (
    id integer NOT NULL,
    "libraryId" integer NOT NULL,
    city text NOT NULL,
    distance double precision NOT NULL
);


ALTER TABLE public."Distance" OWNER TO postgres;

--
-- Name: Distance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Distance_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Distance_id_seq" OWNER TO postgres;

--
-- Name: Distance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Distance_id_seq" OWNED BY public."Distance".id;


--
-- Name: Friend; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Friend" (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    relationship text,
    "userId" integer,
    "phoneNumber" text
);


ALTER TABLE public."Friend" OWNER TO postgres;

--
-- Name: Friend_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Friend_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Friend_id_seq" OWNER TO postgres;

--
-- Name: Friend_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Friend_id_seq" OWNED BY public."Friend".id;


--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Invoice" (
    id integer NOT NULL,
    "bookingId" integer NOT NULL,
    "invoiceNumber" text DEFAULT 'INV-0'::text NOT NULL,
    libraryaddress text NOT NULL,
    "libraryName" text NOT NULL,
    "invoiceDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "customerName" text NOT NULL,
    "customerEmail" text NOT NULL,
    "customerPhoneNumber" text NOT NULL,
    "libraryId" integer NOT NULL,
    "initialPrice" integer NOT NULL,
    "finalPrice" integer NOT NULL,
    paid boolean NOT NULL,
    "bookingDate" timestamp(3) without time zone NOT NULL,
    "bookingPeriod" integer NOT NULL,
    "bookingStatus" text NOT NULL,
    approved boolean NOT NULL,
    "timeStamp" timestamp(6) without time zone,
    "bookingFinalDate" timestamp(3) without time zone NOT NULL,
    "seatLabel" text NOT NULL,
    "timeSlotDetails" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Invoice" OWNER TO postgres;

--
-- Name: Invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Invoice_id_seq" OWNER TO postgres;

--
-- Name: Invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public."Invoice".id;


--
-- Name: Library; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Library" (
    id integer NOT NULL,
    "libraryOwnerId" integer,
    name text NOT NULL,
    "longDescription" text,
    "shortDescription" text NOT NULL,
    "cardImage" text,
    images text[],
    address jsonb,
    "commingSoonMessage" text DEFAULT 'false'::text,
    deleted boolean DEFAULT false NOT NULL,
    "comingSoon" boolean DEFAULT false NOT NULL,
    approved boolean DEFAULT false NOT NULL,
    legal text,
    "registrationFees" integer DEFAULT 500 NOT NULL,
    "cinCertificateFile" text,
    "cinNumber" text,
    "gstCertificateFile" text,
    "gstNumber" text,
    "msmeCertificateFile" text,
    "msmeNumber" text,
    "tanCertificateFile" text,
    "tanNumber" text,
    coords double precision[],
    "Price" integer,
    "avgRating" double precision,
    "propertyType" text,
    "uploadElectricityBill" text,
    "uploadLeaseAgreement" text,
    "offlinePaymentPermission" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Library" OWNER TO postgres;

--
-- Name: Library_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Library_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Library_id_seq" OWNER TO postgres;

--
-- Name: Library_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Library_id_seq" OWNED BY public."Library".id;


--
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    id integer NOT NULL,
    location text NOT NULL,
    "locationImage" text,
    coords double precision[],
    "appId" integer NOT NULL
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- Name: Location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Location_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Location_id_seq" OWNER TO postgres;

--
-- Name: Location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Location_id_seq" OWNED BY public."Location".id;


--
-- Name: Otp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Otp" (
    id integer NOT NULL,
    email text NOT NULL,
    emailotp text,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Otp" OWNER TO postgres;

--
-- Name: Otp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Otp_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Otp_id_seq" OWNER TO postgres;

--
-- Name: Otp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Otp_id_seq" OWNED BY public."Otp".id;


--
-- Name: PanCardDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PanCardDetails" (
    id integer NOT NULL,
    "panNumber" text NOT NULL,
    "panCardFile" text NOT NULL,
    "adminId" integer NOT NULL
);


ALTER TABLE public."PanCardDetails" OWNER TO postgres;

--
-- Name: PanCardDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PanCardDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PanCardDetails_id_seq" OWNER TO postgres;

--
-- Name: PanCardDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PanCardDetails_id_seq" OWNED BY public."PanCardDetails".id;


--
-- Name: PhoneOtp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PhoneOtp" (
    id integer NOT NULL,
    phoneotp text,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "phoneNumber" text NOT NULL
);


ALTER TABLE public."PhoneOtp" OWNER TO postgres;

--
-- Name: PhoneOtp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PhoneOtp_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PhoneOtp_id_seq" OWNER TO postgres;

--
-- Name: PhoneOtp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PhoneOtp_id_seq" OWNED BY public."PhoneOtp".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    review text NOT NULL,
    stars integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "libraryId" integer NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    id integer NOT NULL,
    "libraryId" integer NOT NULL,
    "roomNo" integer NOT NULL,
    "Ac" boolean DEFAULT false NOT NULL,
    "doorPosition" integer[] DEFAULT ARRAY[0, 0, 0, 0, 0],
    "roomName" text
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- Name: Room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Room_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Room_id_seq" OWNER TO postgres;

--
-- Name: Room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Room_id_seq" OWNED BY public."Room".id;


--
-- Name: Seat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Seat" (
    id integer NOT NULL,
    "seatId" text NOT NULL,
    "seatLabel" text NOT NULL,
    "roomId" integer NOT NULL,
    rotation integer DEFAULT 0 NOT NULL,
    "seatName" text
);


ALTER TABLE public."Seat" OWNER TO postgres;

--
-- Name: Seat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Seat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Seat_id_seq" OWNER TO postgres;

--
-- Name: Seat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Seat_id_seq" OWNED BY public."Seat".id;


--
-- Name: TimeSlot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TimeSlot" (
    id integer NOT NULL,
    "slotId" text NOT NULL,
    "from" text NOT NULL,
    "to" text NOT NULL,
    booked boolean DEFAULT false NOT NULL,
    "bookedById" integer,
    "bookingSource" text DEFAULT 'app'::text NOT NULL,
    "bookingEndDate" timestamp(3) without time zone,
    "seatId" integer NOT NULL,
    price integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TimeSlot" OWNER TO postgres;

--
-- Name: TimeSlot_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TimeSlot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TimeSlot_id_seq" OWNER TO postgres;

--
-- Name: TimeSlot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TimeSlot_id_seq" OWNED BY public."TimeSlot".id;


--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    "transactionId" text NOT NULL,
    amount double precision NOT NULL,
    type public."TransactionType" NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer,
    "adminId" integer,
    "libraryId" integer,
    "bookingId" integer,
    "expiresAt" timestamp(3) without time zone,
    "isOfflinePayment" boolean DEFAULT false,
    "offlinePaymentStatus" public."OfflinePaymentStatus"
);


ALTER TABLE public."Transaction" OWNER TO postgres;

--
-- Name: Transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Transaction_id_seq" OWNER TO postgres;

--
-- Name: Transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transaction_id_seq" OWNED BY public."Transaction".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "accountType" text NOT NULL,
    "additionalDetails" text[],
    image text,
    "resetPasswordExpires" timestamp(3) without time zone,
    "phoneNumber" character varying(10) NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _LibraryBookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_LibraryBookings" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_LibraryBookings" OWNER TO postgres;

--
-- Name: _OwnedProperties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_OwnedProperties" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_OwnedProperties" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: location_appid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_appid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.location_appid_seq OWNER TO postgres;

--
-- Name: location_appid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_appid_seq OWNED BY public."Location"."appId";


--
-- Name: AdhaarCardDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AdhaarCardDetails" ALTER COLUMN id SET DEFAULT nextval('public."AdhaarCardDetails_id_seq"'::regclass);


--
-- Name: Admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);


--
-- Name: Amenities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenities" ALTER COLUMN id SET DEFAULT nextval('public."Amenities_id_seq"'::regclass);


--
-- Name: App id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."App" ALTER COLUMN id SET DEFAULT nextval('public."App_id_seq"'::regclass);


--
-- Name: Booking id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking" ALTER COLUMN id SET DEFAULT nextval('public."Booking_id_seq"'::regclass);


--
-- Name: BookingFriend id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookingFriend" ALTER COLUMN id SET DEFAULT nextval('public."BookingFriend_id_seq"'::regclass);


--
-- Name: Distance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Distance" ALTER COLUMN id SET DEFAULT nextval('public."Distance_id_seq"'::regclass);


--
-- Name: Friend id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friend" ALTER COLUMN id SET DEFAULT nextval('public."Friend_id_seq"'::regclass);


--
-- Name: Invoice id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice" ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);


--
-- Name: Library id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Library" ALTER COLUMN id SET DEFAULT nextval('public."Library_id_seq"'::regclass);


--
-- Name: Location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location" ALTER COLUMN id SET DEFAULT nextval('public."Location_id_seq"'::regclass);


--
-- Name: Location appId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location" ALTER COLUMN "appId" SET DEFAULT nextval('public.location_appid_seq'::regclass);


--
-- Name: Otp id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otp" ALTER COLUMN id SET DEFAULT nextval('public."Otp_id_seq"'::regclass);


--
-- Name: PanCardDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PanCardDetails" ALTER COLUMN id SET DEFAULT nextval('public."PanCardDetails_id_seq"'::regclass);


--
-- Name: PhoneOtp id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PhoneOtp" ALTER COLUMN id SET DEFAULT nextval('public."PhoneOtp_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Room id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room" ALTER COLUMN id SET DEFAULT nextval('public."Room_id_seq"'::regclass);


--
-- Name: Seat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat" ALTER COLUMN id SET DEFAULT nextval('public."Seat_id_seq"'::regclass);


--
-- Name: TimeSlot id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TimeSlot" ALTER COLUMN id SET DEFAULT nextval('public."TimeSlot_id_seq"'::regclass);


--
-- Name: Transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: AdhaarCardDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AdhaarCardDetails" (id, "adhaarNumber", "adhaarCardFile", "adminId") FROM stdin;
2	154651651165	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/ashwinranjanTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29900/bhbua%20road%20%283%29.png	2
3	123223422342	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/harshkumarsawThu%20Jan%2008%202015%2000%3A00%3A00%20GMT-0800%20%28Pacific%20Standard%20Time%29382/WhatsApp%20Image%202025-01-14%20at%2000.36.21.jpeg	3
4	654654654	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/chintamanideviWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%292/Ekagra%20Academy%20%281%29.jpg	4
5	asdzadads	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/maashardaadhyankendralibraryTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29468/Screenshot%202025-01-14%20at%206.21.01%C3%A2%C2%80%C2%AFPM.png	5
6	asdad	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/takshilalibraryTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29584/a27464971fe07553141f964152ff9ecd.jpg	6
7	asdasd	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/subodhlibraryWed%20Jan%2001%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%2991/WhatsApp%20Image%202025-01-07%20at%2013.07.04.jpeg	7
8	asdasd	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/capitallibraryWed%20Jan%2001%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29259/marino-linic-2BEAqN721hU-unsplash.jpg	8
9	asdad	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/vivekanandalibraryThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29886/WhatsApp%20Image%202025-01-06%20at%2012.15.08%20%281%29.jpeg	9
10	154651651165	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/pragyalibraryTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29217/WhatsApp%20Image%202025-01-07%20at%2013.07.03%20%281%29.jpeg	10
11	123223422342	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/harshkumarsawWed%20Feb%2010%202016%2000%3A00%3A00%20GMT-0800%20%28Pacific%20Standard%20Time%29961/runhellotomcat.jpeg	11
12	154651651165	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/pustakalayaThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29727/2023-02-07%20%281%29.jpg	12
13	HEAVEN'S LIB	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/heaven%27slibrary%EF%B8%8FTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29422/2022-06-08.jpg	13
14	asdfadsfadfa	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdasdasdWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29981/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	14
15	asdfadsfadfa	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdasdasdWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29402/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	15
16	try	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/gfhtrhThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29281/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	16
17	tretretret	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/dyryrThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29745/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	17
18	hjkhjkuhkiuy	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdasdasdFri%20Jan%2010%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29455/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	18
19	1234567811	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanFri%20Jan%2017%202014%2000%3A00%3A00%20GMT%2B0500%20%28Pakistan%20Standard%20Time%29603/122A850C-06ED-47E3-A9C2-1CEE8CD18E67_1_105_c-removebg-preview.png	19
20	1234567811	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0500%20%28Pakistan%20Standard%20Time%29155/122A850C-06ED-47E3-A9C2-1CEE8CD18E67_1_105_c-removebg-preview.png	20
21	51352	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/piuhhkbmnSat%20Jan%2018%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29818/sad.png	21
22	654651	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdWed%2C%2003%20Jan%202007%2009%3A11%3A42%20GMT523/verification.jpeg	22
23	123456781166	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%2C%2018%20Feb%201987%2019%3A00%3A00%20GMT701/122A850C-06ED-47E3-A9C2-1CEE8CD18E67_1_105_c-removebg-preview%20Background%20Removed.jpeg	23
24	123456781188	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanTue%2C%2021%20May%201991%2019%3A00%3A00%20GMT639/122A850C-06ED-47E3-A9C2-1CEE8CD18E67_1_105_c-removebg-preview%20Background%20Removed.jpeg	24
25	455245247527	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdohaisjdassdSat%2C%2020%20Jan%202007%2018%3A30%3A00%20GMT516/Screenshot%202025-01-19%20at%203.26.27%C3%A2%C2%80%C2%AFPM.png	25
26	736476374637	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2010%20May%201987%2019%3A00%3A00%20GMT143/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60.JPG	26
27	374673647326	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanFri%2C%2011%20Feb%202000%2019%3A00%3A00%20GMT724/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60.JPG	27
28	261762716271	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT275/cohort%203.png	28
29	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT573/pic1-modified.png	29
30	233323323232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT921/pic1-modified.png	30
31	212121212121	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT290/pic4.png	31
32	456345645645	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdaTue%2C%2030%20Apr%201991%2018%3A30%3A00%20GMT490/Snips%202.jpeg	32
33	222222222234	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT172/pic1-modified.png	33
34	233323123323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT670/pic1-modified.png	34
35	221212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT70/pic2.png	35
36	123456781122	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT403/pic1-modified.png	36
37	323232323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT486/pic3-modified.png	37
38	232323232323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT575/portfolio-1%20thumb.png	38
39	123323232323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT216/pic1-modified.png	39
40	122121221212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2009%20Dec%202000%2019%3A00%3A00%20GMT905/upwork%20portfolio-1.png	40
41	456543651365	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/dasdfasdasdWed%2C%2024%20Jan%202007%2018%3A30%3A00%20GMT622/Snips%201.jpeg	41
42	123456781112	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT140/pic1-modified.png	42
43	123456781112	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%2C%2020%20Dec%202000%2019%3A00%3A00%20GMT219/upwork%20portfolio-1.png	43
44	121212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT689/pic3-modified.png	44
45	123456781121	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT657/pic3-modified.png	45
46	122323212323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT200/portfolio-1%20thumb.png	46
47	434334343434	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT97/pic3.png	47
48	121212212212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2011%20Nov%202000%2019%3A00%3A00%20GMT60/pic1-modified.png	48
49	122121212122	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT955/upwork%20portfolio-1.png	49
50	212112121232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT918/pic1-modified.png	50
51	334232232323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2009%20Dec%202000%2019%3A00%3A00%20GMT698/Screenshot%202025-01-22%20at%201.05.41%20PM.png	51
52	123456781143	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT982/Screenshot%202025-01-22%20at%201.05.41%20PM.png	52
53	433333444444	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT95/Screenshot%202025-01-22%20at%201.05.41%20PM.png	53
54	322323232233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT895/Screenshot%202025-01-24%20at%201.54.18%20PM.png	54
55	846546546546	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/yuvrajtiwariFri%2C%2026%20Jan%202007%2018%3A30%3A00%20GMT792/snip%20latest1.jpeg	55
56	123456781122	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT204/Screenshot%202025-01-23%20at%2012.45.38%20PM.png	56
57	123212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT993/Screenshot%202025-01-22%20at%201.05.41%20PM.png	57
58	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2017%20Feb%201986%2019%3A00%3A00%20GMT265/portfolio-1%20thumb.png	58
59	121212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT903/pic3-modified.png	59
60	121212121213	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2016%20Feb%201986%2019%3A00%3A00%20GMT615/pic3-modified.png	60
61	212122121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT91/pic3-modified.png	61
62	121221212212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT714/pic2.png	62
63	323232323232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT589/pic1-modified.png	63
64	323223232232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT970/pic4.png	64
65	121221221212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT792/pic3-modified.png	65
66	343434343433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT765/pic3-modified.png	66
67	323223232232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT466/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	67
68	232323323232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2024%20May%201987%2019%3A00%3A00%20GMT978/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	68
69	322323232332	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT21/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	69
70	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT497/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	70
71	122121221212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/121212121Mon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT157/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	71
72	234234123123	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/vivekMon%2C%2006%20May%201991%2018%3A30%3A00%20GMT303/WhatsApp%20Image%202025-01-26%20at%2016.31.00.jpeg	72
73	131231231231	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdWed%2C%2020%20May%201992%2018%3A30%3A00%20GMT916/WhatsApp%20Image%202025-01-27%20at%2017.00.42.jpeg	73
74	121212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT440/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	74
75	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT551/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	75
76	464664646464	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT844/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	76
77	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT388/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	77
78	463643645363	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT816/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	78
79	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT543/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	79
80	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT825/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	80
81	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT687/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	81
82	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT426/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	82
83	121212121216	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT66/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	83
84	122121221212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%2C%2020%20Dec%202000%2019%3A00%3A00%20GMT512/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	84
85	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT196/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	85
86	475647574657	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT906/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	86
87	131231231231	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdTue%2C%2002%20May%201995%2018%3A30%3A00%20GMT127/a27464971fe07553141f964152ff9ecd.jpg	87
88	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanTue%2C%2011%20Jan%202000%2019%3A00%3A00%20GMT30/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	88
89	121212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT880/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	89
90	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT598/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	90
91	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT456/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	91
92	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT860/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	92
93	323223232232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT886/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	93
94	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT804/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	94
95	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT524/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	95
96	123123123123	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/sucesslibraryTue%2C%2007%20May%201991%2018%3A30%3A00%20GMT778/WhatsApp%20Image%202025-01-28%20at%2022.23.25.jpeg	96
97	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT503/Screenshot%202025-02-02%20at%2011.44.05%20AM.png	97
98	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT998/Screenshot%202025-02-02%20at%2011.44.05%20AM.png	98
99	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2011%20Dec%201999%2019%3A00%3A00%20GMT580/Screenshot%202025-01-31%20at%2010.26.19%20AM.png	99
100	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT595/backendDeveloper.png	100
101	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT475/backendDeveloper.png	102
102	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT822/Screenshot%202025-01-31%20at%2011.31.55%20AM.png	103
103	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT242/MERN%20STACK%20DEVELOPER.png	104
104	121212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT428/blog-app-1.png	105
105	1234567811	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT308/backendDeveloper.png	106
106	123456781166	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT569/backendDeveloper.png	107
107	1234567811	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT192/backendDeveloper.png	109
108	121212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT902/blog-app-3.png	110
109	332332323233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2010%20Dec%202000%2019%3A00%3A00%20GMT514/blog-app-1.png	111
\.


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" (id, username, email, "Dob", password, "accountType", address, "profileImage", "resetPasswordExpires", "phoneNumber", "createdAt", "fullName", "updatedAt", "passportPhoto") FROM stdin;
2	ashwinranjanTue Jan 07 2025 00:00:00 GMT+0530 (India Standard Time)900	ranjan.ashwin02@gmail.com	2025-01-06 18:30:00	$2b$10$fKlWWBgrDME0gvrlWTkwLuGi7tsDfshCBANdGpFjkfzE0fJA6r/nO	Admin	"{\\"line1\\":\\"22, Bageswari Road, Near Maa Bageswari Inter College, Gaya, BH 823002 IN\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"Gaya\\",\\"pincode\\":\\"823002\\"}"	\N	\N	9416482163	2025-01-14 09:42:35.324	Ashwin Ranjan	2025-01-14 09:42:35.324	\N
5	maashardaadhyankendralibraryTue Jan 07 2025 00:00:00 GMT+0530 (India Standard Time)468	yadavashu3232@gmail.com	2025-01-06 18:30:00	$2b$10$klx7abndeUxSEiVQba8Kju8W171t9EnDKU/qnOBb46RUYI0M9Q32O	Admin	"{\\"line1\\":\\"sdafasdf\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"asdfasdf\\",\\"pincode\\":\\"asdf\\"}"	\N	\N	9992304660	2025-01-14 16:05:54.614	Maa sharda adhyan Kendra library	2025-01-14 16:05:54.614	\N
6	takshilalibraryTue Jan 07 2025 00:00:00 GMT+0530 (India Standard Time)584	ranjan.ashwin02+takshila@gmail.com	2025-01-06 18:30:00	$2b$10$nzTJBC21Lwtj0zKptrnY4uZiQypTu35VupqS6W.hjibuQvCt4Wycy	Admin	"{\\"line1\\":\\"sdasdasdf\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"sadfasdf\\",\\"pincode\\":\\"dsfasdf\\"}"	\N	\N	9992304661	2025-01-14 16:12:15.352	Takshila Library	2025-01-14 16:12:15.352	\N
7	subodhlibraryWed Jan 01 2025 00:00:00 GMT+0530 (India Standard Time)91	ranjan.ashwin02+subodh@gmail.com	2024-12-31 18:30:00	$2b$10$n44SVq7IIkgqS4g.whiv5uMxBdhNuR439d20I5.PMUGtSrhXC.vY6	Admin	"{\\"line1\\":\\"asdasd\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"asdasd\\",\\"pincode\\":\\"adas\\"}"	\N	\N	9992304662	2025-01-14 17:17:15.981	Subodh library	2025-01-14 17:17:15.981	\N
8	capitallibraryWed Jan 01 2025 00:00:00 GMT+0530 (India Standard Time)259	ranjan.ashwin02+capital@gmail.com	2024-12-31 18:30:00	$2b$10$emK2ikNBmvKnVA4hnGCq.uzpowTGlwOb52hZVKMNeFv.RoHh7nmV6	Admin	"{\\"line1\\":\\"275\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"Gaya\\",\\"pincode\\":\\"823001\\"}"	\N	\N	9992304663	2025-01-14 17:22:34.586	Capital Library	2025-01-14 17:22:34.586	\N
9	vivekanandalibraryThu Jan 09 2025 00:00:00 GMT+0530 (India Standard Time)886	ranjan.ashwin02+viveka@gmail.com	2025-01-08 18:30:00	$2b$10$2DpHQzk3xMdRZiDc6PN0QObuf6alj7cl/uHqdnaM3lt1CDoQcnHYi	Admin	"{\\"line1\\":\\"adsasd\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"asdasd\\",\\"pincode\\":\\"asdads\\"}"	\N	\N	9992304664	2025-01-14 17:26:12.73	Vivekananda Library	2025-01-14 17:26:12.73	\N
10	pragyalibraryTue Jan 07 2025 00:00:00 GMT+0530 (India Standard Time)217	ranjan.ashwin02+pra@gmail.com	2025-01-06 18:30:00	$2b$10$0cnF52bFqMyS3Sn56SjEcud8iy113Q4BGgSuG8rMMkgnC0V3GJPWK	Admin	"{\\"line1\\":\\"Pragya library\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"dsasd\\",\\"pincode\\":\\"asdasd\\"}"	\N	\N	9992304665	2025-01-14 17:30:09.743	Pragya library	2025-01-14 17:30:09.743	\N
11	harshkumarsawWed Feb 10 2016 00:00:00 GMT-0800 (Pacific Standard Time)961	indian@gmail.com	2016-02-10 08:00:00	$2b$10$hmnWCDQvvWPTRe8.5onPMOaEo.mLsHy49Z/x6P7cmOG7vNNX9nm8G	Admin	"{\\"line1\\":\\"QTR A/4 ,LIC COLONY, SEC 5/B\\",\\"line2\\":\\"Jharkhand\\",\\"city\\":\\"MOHALI\\",\\"pincode\\":\\"827006\\"}"	\N	\N	7991168442	2025-01-14 20:39:00.841	Harsh kumar saw	2025-01-14 20:39:00.841	\N
12	pustakalayaThu Jan 09 2025 00:00:00 GMT+0530 (India Standard Time)727	ranjan.ashwin02+pus@gmail.com	2025-01-08 18:30:00	$2b$10$glVOoNrB3d1NK6L.eUutM.csyocqzq/yVg2uyEk5NPeIj97xVMhNa	Admin	"{\\"line1\\":\\"asdasd\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"asasdas\\",\\"pincode\\":\\"asdasd\\"}"	\N	\N	9992304666	2025-01-15 10:51:20.112	Pustakalaya	2025-01-15 10:51:20.112	\N
13	heaven'slibrary️Tue Jan 07 2025 00:00:00 GMT+0530 (India Standard Time)422	ranjan.ashwin+21@gmail.com	2025-01-06 18:30:00	$2b$10$HloGz8tTRMcGekMIuwAXk.rDYGESUNuWese.hO9J4aV3VuMXcCZIG	Admin	"{\\"line1\\":\\"asdasd\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"asdasd\\",\\"pincode\\":\\"asdasd\\"}"	\N	\N	9992304667	2025-01-15 10:55:40.814	HEAVEN'S LIBRARY ️	2025-01-15 10:55:40.814	\N
14	asdasdasdasdWed Jan 08 2025 00:00:00 GMT+0530 (India Standard Time)981	subodhe987+aa@gmail.com	2025-01-07 18:30:00	$2b$10$hcyh5bxmRZwIt17E6rlZYeqWFQYUpn68ogzKVsRXU1JDi.WSVdpDK	Admin	"{\\"line1\\":\\"dfadfafdasdf\\",\\"line2\\":\\"Jharkhand\\",\\"city\\":\\"asdfasdf\\",\\"pincode\\":\\"asdfasdf\\"}"	\N	\N	9992304690	2025-01-15 12:58:23.398	asdasdasdasd	2025-01-15 12:58:23.398	\N
15	asdasdasdasdWed Jan 08 2025 00:00:00 GMT+0530 (India Standard Time)402	subodhe987+123@gmail.com	2025-01-07 18:30:00	$2b$10$HHal0Qc6iiVWP74akEC5ruAluJWkRL/Fr.VyQRBtAyTk5lDV5lej6	Admin	"{\\"line1\\":\\"dfadfafdasdf\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"gaya\\",\\"pincode\\":\\"asdfasdf\\"}"	\N	\N	7976648675	2025-01-15 13:13:15.166	asdasdasdasd	2025-01-15 13:13:15.166	\N
16	gfhtrhThu Jan 09 2025 00:00:00 GMT+0530 (India Standard Time)281	subodhe987+6522@gmail.com	2025-01-08 18:30:00	$2b$10$EmmRCUJkIYRF5ZaOCXryOeugg1ujiA.T8zVdxaWyHp71XcGXOsZ3i	Admin	"{\\"line1\\":\\"fryryryt\\",\\"line2\\":\\"Haryana\\",\\"city\\":\\"gaya\\",\\"pincode\\":\\"tyyyty\\"}"	\N	\N	7976648675	2025-01-15 13:21:23.893	gfhtrh	2025-01-15 13:21:23.893	\N
18	asdasdasdasdFri Jan 10 2025 00:00:00 GMT+0530 (India Standard Time)455	subodhe987+a6@gmail.com	2025-01-09 18:30:00	$2b$10$dKpF5duWsDEyWhXw6yRfcuA7cvCE7/ouUG7U/RHuziM1XbaRtOgkO	Admin	"{\\"line1\\":\\"dfadfafdasdf\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"asdfasdf\\",\\"pincode\\":\\"8323001\\"}"	\N	\N	7976648675	2025-01-15 13:40:13.361	asdasdasdasd	2025-01-15 13:40:13.361	\N
19	muhammadzeeshanFri Jan 17 2014 00:00:00 GMT+0500 (Pakistan Standard Time)603	zeeshandev038@gmail.com	2014-01-16 19:00:00	$2b$10$0v3Nzbw2LpHFFEPtjMSCU.gPFkDgfQUSFc/L43EmMU96IERchHhuO	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	9992304658	2025-01-18 10:37:02.439	Muhammad Zeeshan	2025-01-18 10:37:02.439	\N
20	muhammadzeeshanWed Jan 08 2025 00:00:00 GMT+0500 (Pakistan Standard Time)155	hankhan123623@gmail.com	2025-01-07 19:00:00	$2b$10$aEIOMyD7PWSKq2Blc669o.lxlndg9.eyiOv.KvfAz6Fw/cB262zZO	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	8580368605	2025-01-18 13:08:54.63	Muhammad Zeeshan	2025-01-18 13:08:54.63	\N
21	piuhhkbmnSat Jan 18 2025 00:00:00 GMT+0530 (India Standard Time)818	support@jythu.us	2025-01-17 18:30:00	$2b$10$mgT6YEXq.uBr/0bPAd5b2u8rQqNXIE.wpjNpW0JKGBMXMJ8bZR58W	Admin	"{\\"line1\\":\\"1212123123\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"43512\\",\\"pincode\\":\\"55\\"}"	\N	\N	7765855182	2025-01-18 16:20:16.78	piuhhkbmn	2025-01-18 16:20:16.78	\N
22	asdasdWed, 03 Jan 2007 09:11:42 GMT523	ranjan.ashwin02+asd2@gmail.com	2007-01-03 09:11:42	$2b$10$IifbHHUCqLfDFBic4QLmjuYJ5oKP5999aiHEMgrOgywLsQ20tFlNK	Admin	"{\\"line1\\":\\"123123\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"dsads\\",\\"pincode\\":\\"dasdads\\"}"	\N	\N	9992304665	2025-01-20 09:12:55.607	asdasd	2025-01-20 09:12:55.607	\N
23	muhammadzeeshanWed, 18 Feb 1987 19:00:00 GMT701	muhammadxzeeshan038@gmail.com	1987-02-18 19:00:00	$2b$10$mwYRU46Rtku/WwGUXl/s5O5kWUHt74XFJ8haYmTQtkdtS6JuB3YgC	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	9992304661	2025-01-20 16:26:43.682	Muhammad Zeeshan	2025-01-20 16:26:43.682	\N
24	muhammadzeeshanTue, 21 May 1991 19:00:00 GMT639		1991-05-21 19:00:00	$2b$10$Z5quZ0eyFChICtvK5LZYluJF5srWtjFdH2p9Xrzo739O8azSfxaV2	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N		2025-01-20 16:31:58.439	Muhammad Zeeshan	2025-01-20 16:31:58.439	\N
25	asdohaisjdassdSat, 20 Jan 2007 18:30:00 GMT516	ranjan.ashwin02+asdadsa@gmail.com	2007-01-20 18:30:00	$2b$10$9RLfijFdqZ9KfMIVGnlJEOCf7euRC3bRk0aumeFi1d8eaybGG.lke	Admin	"{\\"line1\\":\\"gdfsdfads\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"asdfasdfsadf\\",\\"pincode\\":\\"252424\\"}"	\N	\N	9992304668	2025-01-21 14:49:22.297	asdohaisjdassd	2025-01-21 14:49:22.297	\N
26	muhammadzeeshanSun, 10 May 1987 19:00:00 GMT143	ranjan+viveka@gmail.com	1987-05-10 19:00:00	$2b$10$mm3gYSILwd2c1mgilPZ3lOlKA08gRYBC3Ol5HGsc9zlvk5LXmWu56	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"23430\\"}"	\N	\N	5665656565	2025-01-22 10:28:33.445	Muhammad Zeeshan	2025-01-22 10:28:33.445	\N
27	muhammadzeeshanFri, 11 Feb 2000 19:00:00 GMT724	ranjann02+viveka@gmail.com	2000-02-11 19:00:00	$2b$10$679udXZcveeMw89AVb2WLekIf8g///2aYQFRqfShynDMbR3NgkpuW	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"23430\\"}"	\N	\N	3647367436	2025-01-22 14:08:56.657	Muhammad Zeeshan	2025-01-22 14:08:56.657	\N
28	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT275	ranjan.ashwika@gmail.com	2000-12-11 19:00:00	$2b$10$MPzE8a4uaClPwLDvzu3mKe6Wa7r2g6VBZMS/1AC.70/.6BefQGmLq	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"23430\\"}"	\N	\N	5656565665	2025-01-22 15:20:10.741	Muhammad Zeeshan	2025-01-22 15:20:10.741	\N
29	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT573	ranjan.as2+viveka@gmail.com	2000-12-11 19:00:00	$2b$10$v4zE/.p7bENNeoqD1YSXMuRcvT7cUKWAYAY9m5NBkCUq157uEuKDG	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"23430\\"}"	\N	\N	6556656656	2025-01-23 09:57:18.843	Muhammad Zeeshan	2025-01-23 09:57:18.843	\N
30	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT921	ranjan.ashwin02+daoshdouh@gmail.com	2000-12-11 19:00:00	$2b$10$fSsmVc0O66F3SnUecMqWYOBLB0nFHQeK1Kt96bmo8jETW68tNXWM.	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"23430\\"}"	\N	\N	9416482163	2025-01-23 10:07:51.088	Muhammad Zeeshan	2025-01-23 10:07:51.088	\N
31	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT290	ranjan.55552@gmail.com	2000-12-11 19:00:00	$2b$10$KevlVKXILhg0yv3T6yrnF.Dr3O5QVbz0LUfubJUtaSf8f3TVL68lS	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"23430\\"}"	\N	\N	6565656656	2025-01-23 10:27:14.125	Muhammad Zeeshan	2025-01-23 10:27:14.125	\N
40	muhammadzeeshanSat, 09 Dec 2000 19:00:00 GMT905	muhammxzshan038@gmail.com	2000-12-09 19:00:00	$2b$10$2Bo15Tgqnb7EkLtk6DqgROGzZX27NGo1qrWkFRYJ49J4C2MpWRvPi	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	6565655665	2025-01-25 02:33:41.094	Muhammad Zeeshan	2025-01-25 02:33:41.094	\N
4	chintamanideviWed Jan 08 2025 00:00:00 GMT+0530 (India Standard Time)2	amitnirala14@gmail.com	2025-01-07 18:30:00	$2b$10$emK2ikNBmvKnVA4hnGCq.uzpowTGlwOb52hZVKMNeFv.RoHh7nmV6	Admin	"{\\"line1\\":\\"AP colony\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"Gaya\\",\\"pincode\\":\\"823001\\"}"	\N	\N	9471803877	2025-01-14 10:05:29.788	Chintamani Devi	2025-01-14 10:05:29.788	\N
32	asdasdaTue, 30 Apr 1991 18:30:00 GMT490	ranjan.ashwin02+asdh2@gmail.com	1991-04-30 18:30:00	$2b$10$bGMQ0wCzt9FBlgLRpxziSudNLt6R7S7SlLUvA2skmxoTm4KdoWH0u	Admin	"{\\"line1\\":\\"asd\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"asdads\\",\\"pincode\\":\\"asdasd\\"}"	\N	\N	9992304680	2025-01-24 13:57:11.382	asdasda	2025-01-24 13:57:11.382	\N
33	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT172	muhammadzeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$qHPvaemrzmkZ0GNwnDoBMuq.S7m1OYP9FIiNP4IVNWZp.kbv8KaIC	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"555555\\"}"	\N	\N	9992304660	2025-01-24 16:12:27.195	Muhammad Zeeshan	2025-01-24 16:12:27.195	\N
34	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT670	muhammxzeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$q5lyxxsrMTaZVU0ji4IdTewJH8oWwtjMtown3/msInMipJkh/IME6	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	6655566565	2025-01-24 16:42:36.652	Muhammad Zeeshan	2025-01-24 16:42:36.652	\N
35	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT70	muhammadeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$0A5CRmAdPqP2wRjRLO7LAu6FVhKcxYTiGDdz5D4su1vBwqpOL9RKe	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	6767667767	2025-01-24 17:01:36.404	Muhammad Zeeshan	2025-01-24 17:01:36.404	\N
36	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT403	ali@gmail.com	2000-12-11 19:00:00	$2b$10$r7B8srKSgds0a69UFOzeBuTp8IH4f1Dx29sRG9zw8V6JALM/F/R2K	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	6776677676	2025-01-25 02:02:19.126	Muhammad Zeeshan	2025-01-25 02:02:19.126	\N
37	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT486	muhammadxeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$ek65BsP2IvapihbVvVCRMe8f60Voq0azOFe6dOhHtC3s9iaVbugzy	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	5656566556	2025-01-25 02:16:54.906	Muhammad Zeeshan	2025-01-25 02:16:54.906	\N
38	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT575	muhammadxzeesan038@gmail.com	2000-12-11 19:00:00	$2b$10$fyCA1r4W2ZA3znH.2gW18eJ0Ow7PKv9Fg30h0EURpucHSjheTsGz6	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	6556656556	2025-01-25 02:21:18.292	Muhammad Zeeshan	2025-01-25 02:21:18.292	\N
39	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT216	muhamadxzeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$95rhlDMmHI1Amb7K1UKECOLzngzZdZp8v4TD5fDBJf9rYuyNmESTm	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"25000\\"}"	\N	\N	5665565565	2025-01-25 02:31:08.796	Muhammad Zeeshan	2025-01-25 02:31:08.796	\N
41	dasdfasdasdWed, 24 Jan 2007 18:30:00 GMT622	ranjan.ashwin02+asdiuhij@gmail.com	2007-01-24 18:30:00	$2b$10$S1OTcBk9tQtHWifDRcC6FO56weo/QLVytfTvotDH1Ec5gwEXUc2W.	Admin	"{\\"line1\\":\\"asdasd\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"asdasd\\",\\"pincode\\":\\"365465\\"}"	\N	\N	9992304660	2025-01-25 09:22:13.91	dasdfasdasd	2025-01-25 09:22:13.91	\N
42	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT140	hankhanw43423@gmail.com	2000-12-11 19:00:00	$2b$10$./aQIndwCk7Lk7La35ZKYONzh/Bh32DzLwnsqQd0MFuXqpUuZmwc6	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Goa\\",\\"state\\":\\"\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250334\\"}"	\N	\N	6565656566	2025-01-27 10:58:54.132	Muhammad Zeeshan	2025-01-27 10:58:54.132	\N
43	muhammadzeeshanWed, 20 Dec 2000 19:00:00 GMT219	hankhan123443623@gmail.com	2000-12-20 19:00:00	$2b$10$uh8h6AvsCEMxzeCMp8CNBOUmPqIxSpkXhPlXd0O4S0WmHWVyZanxa	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250033\\"}"	\N	\N	6566556566	2025-01-27 11:01:50.394	Muhammad Zeeshan	2025-01-27 11:01:50.394	\N
44	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT689	hankhan12323222623@gmail.com	2000-12-11 19:00:00	$2b$10$9ONPKixRql2zGnGf6oGYx.gsmpUZwtULUWIYIAMbSieNS1l08dtuK	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"123456\\"}"	\N	\N	5656565656	2025-01-27 13:05:50.809	Muhammad Zeeshan	2025-01-27 13:05:50.809	\N
45	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT657	muhammeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$B.uFd9cHm6alTYYiESJ2c.tI8S5DIpcCEtAhY2YIUde73tGtvvY9i	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250004\\"}"	\N	\N	6565665656	2025-01-27 13:45:21.221	Muhammad Zeeshan	2025-01-27 13:45:21.221	\N
46	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT200	muhammaeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$JkJ5BYE5.XZhG/D0SIqe0.63NfFQUQYasRJUqMSYOQhWvmI20hfxe	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	6656566565	2025-01-27 14:07:03.927	Muhammad Zeeshan	2025-01-27 14:07:03.927	\N
47	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT97	hankhan12362565653@gmail.com	2000-12-11 19:00:00	$2b$10$s/5euVnl/N9QIvOIVtleBexRS8TyoZl7n1T7oEXJYjSWTbYyAHRWK	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	5666565655	2025-01-27 14:17:19.284	Muhammad Zeeshan	2025-01-27 14:17:19.284	\N
48	muhammadzeeshanSat, 11 Nov 2000 19:00:00 GMT60	eemuhammadxzeeshan038@gmail.com	2000-11-11 19:00:00	$2b$10$VXb5wwcBsiSNdNoV2ChHyeJmDTGgDf4EkPox0mXQ8.R8Q9gttwLl.	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	6565656565	2025-01-27 14:39:35.268	Muhammad Zeeshan	2025-01-27 14:39:35.268	\N
49	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT955	muhaxxxdxzeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$LaI3CczlXyVfx9MfCfyfue4M0q8GSXPuHMltZY6ARkwzdYp/AuiEm	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	5665665656	2025-01-27 14:59:18.861	Muhammad Zeeshan	2025-01-27 14:59:18.861	\N
50	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT918	muhammewadxzeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$Hun0CdyIIvbrkp0fu9T4BuK4kqmm3Bjeu4qCYDDYbcTj49S.Wfd2u	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	6565656655	2025-01-27 15:27:24.538	Muhammad Zeeshan	2025-01-27 15:27:24.538	\N
51	muhammadzeeshanSat, 09 Dec 2000 19:00:00 GMT698	muhammadx121zeeshan038@gmail.com	2000-12-09 19:00:00	$2b$10$/52dd7T2JZefHRKPFk5HjewAjqMRh6z1rn3ICIcz0Eln9AIU2afcu	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	6565565665	2025-01-27 15:55:46.088	Muhammad Zeeshan	2025-01-27 15:55:46.088	\N
52	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT982	muhammadxze44eshan038@gmail.com	2000-12-11 19:00:00	$2b$10$8pxvNT36ZDKLqpopi4n/cOgeQM.WiMRvIWlhZbrVi5mxULaRc.lRe	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	5656565656	2025-01-27 15:58:57.671	Muhammad Zeeshan	2025-01-27 15:58:57.671	\N
53	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT95	muhammadeeshan03e8@gmail.com	2000-12-11 19:00:00	$2b$10$gh6EN9zEL45V/pSysZ0Xp.56QLnHMKZ8b1niDiILozGxV2hPPJONy	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	6655665656	2025-01-27 16:03:24.567	Muhammad Zeeshan	2025-01-27 16:03:24.567	\N
54	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT895	muhammadxzerreeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$y2MTKDWJxUW1zSfaPMcwKu5gkALkPyww6CoStiYJbciCegiivUcB6	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250000\\"}"	\N	\N	5656655656	2025-01-27 16:24:42.492	Muhammad Zeeshan	2025-01-27 16:24:42.492	\N
55	yuvrajtiwariFri, 26 Jan 2007 18:30:00 GMT792	ranjan.ashwin02+yuvraj@gmail.com	2007-01-26 18:30:00	$2b$10$jWt29/TxSr8uY5TYpfaVWueIVMeQfvMJZPdMWa3MiwkiekT.KOGUa	Admin	"{\\"line1\\":\\"asdasdas\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"Gaya\\",\\"pincode\\":\\"651236\\"}"	\N	\N	9142809623	2025-01-27 17:05:03.731	Yuvraj Tiwari	2025-01-27 17:05:03.731	\N
56	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT204	zeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$9JprzTlgauVaZmuXUl0AmOdOWkuBHEjP5J81QCLupYNxIuFtY3x1m	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250003\\"}"	\N	\N	6565656565	2025-01-27 17:18:29.273	Muhammad Zeeshan	2025-01-27 17:18:29.273	\N
57	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT993	khan@gmail.com	2000-12-11 19:00:00	$2b$10$X9Sp0QzJdUcH5CHf.Z3iAOd8yhXRgxZoKgZz/wtQCUqgrN0Rt5gx6	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Chhattisgarh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250002\\"}"	\N	\N	6556566656	2025-01-27 17:29:42.645	Muhammad Zeeshan	2025-01-27 17:29:42.645	\N
58	muhammadzeeshanMon, 17 Feb 1986 19:00:00 GMT265	kainat@gmail.com	1986-02-17 19:00:00	$2b$10$86IRzt/unfRJYn2aMi9hBO.jkw4UfXHZCbI3mDOHZZtnmuYIDL2YC	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	4545454545	2025-01-27 17:52:45.51	Muhammad Zeeshan	2025-01-27 17:52:45.51	\N
59	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT903	example+dhfije@gmail.com	2000-12-11 19:00:00	$2b$10$An7yrvODGLc2TgIdNNrr2..J4eKyIClwEddcS367kk14MDNC.Ykxi	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Chhattisgarh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	5656565665	2025-01-27 18:04:52.453	Muhammad Zeeshan	2025-01-27 18:04:52.453	\N
60	muhammadzeeshanSun, 16 Feb 1986 19:00:00 GMT615	zeeshan+dhfije@gmail.com	1986-02-16 19:00:00	$2b$10$y.xp5m36Wpa5JOXML4x9suvrE8hsdgO/gP1ffQLgv0wJDuRT2gBcO	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Chhattisgarh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565665656	2025-01-27 18:14:35.715	Muhammad Zeeshan	2025-01-27 18:14:35.715	\N
61	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT91	khan+dhfije@gmail.com	2000-12-11 19:00:00	$2b$10$royt0fx67k6k4f7BobZJJeKZ/9jnVTx4SS88avrDB/DXnj93yME3q	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565655655	2025-01-27 18:24:21.858	Muhammad Zeeshan	2025-01-27 18:24:21.858	\N
62	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT714	ali+dhfije@gmail.com	2000-12-11 19:00:00	$2b$10$BEnhCAgzllAWKt0Y6blrBuhszYuw9APO1FiVmdHda6y11Bm93TUza	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-01-27 18:30:44.034	Muhammad Zeeshan	2025-01-27 18:30:44.034	\N
63	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT589	muhammad+dhfije@gmail.com	2000-12-11 19:00:00	$2b$10$Ldp9eNn43BLrKkclSBfJjeoZJ3A0qUHUToHbfZV1BR8aStXWhTCpu	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565665656	2025-01-27 18:42:34.056	Muhammad Zeeshan	2025-01-27 18:42:34.056	\N
64	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT970	khan+ehfije@gmail.com	2000-12-11 19:00:00	$2b$10$PEqKzxgqTM5McNv6PrGzM.eNxcBnBWjMK1QTn475HnH5xoNUBi6W2	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6656556565	2025-01-27 18:47:13.365	Muhammad Zeeshan	2025-01-27 18:47:13.365	\N
65	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT792	khanali+ehfije@gmail.com	2000-12-11 19:00:00	$2b$10$k1q7eArpfMtog1M6Hjbf2Oa.UkrIdCLg5SWdgp3e5gD5OI5OrvRhm	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Gujarat\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656466	2025-01-27 18:58:59.152	Muhammad Zeeshan	2025-01-27 18:58:59.152	\N
66	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT765	ali+ehfije@gmail.com	2000-12-11 19:00:00	$2b$10$yGMBwnqhEIOnIwtrgeCrLeRhjxSVSq1PsFH5IRkHSnUFrFU04AAsW	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6556546565	2025-01-27 19:14:31.067	Muhammad Zeeshan	2025-01-27 19:14:31.067	\N
67	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT466	khana+ehfije@gmail.com	2000-12-11 19:00:00	$2b$10$u2EMvJNL2u6yivuh8RdR0eSuNHQMpVLar9xnEbQEM.tiO.xDN2FoO	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	5665656556	2025-01-27 19:20:55.728	Muhammad Zeeshan	2025-01-27 19:20:55.728	\N
68	muhammadzeeshanSun, 24 May 1987 19:00:00 GMT978	khanalia+ehfije@gmail.com	1987-05-24 19:00:00	$2b$10$osKg8urmgxt/eEY6mZ.UeOhu/T6EsK9twizykgKDva2p6YS1BxFEy	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	5455466561	2025-01-27 19:26:40.496	Muhammad Zeeshan	2025-01-27 19:26:40.496	\N
69	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT21	khanal+ehfije@gmail.com	2000-12-11 19:00:00	$2b$10$iNe1Vz2LorqjgNGckF/42.qCAm7w/fGTv7wGlX3CgKDeTdBeFJJ.W	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6656565656	2025-01-27 19:30:48.664	Muhammad Zeeshan	2025-01-27 19:30:48.664	\N
70	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT497	khanab+ehfije@gmail.com	2000-12-11 19:00:00	$2b$10$TCjZC2mSaPLpstpIEIT/Kuc/0UkhwenWzZ88GiRDb./b//T5WOpFK	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	5656565656	2025-01-27 19:40:43.99	Muhammad Zeeshan	2025-01-27 19:40:43.99	\N
71	121212121Mon, 11 Dec 2000 19:00:00 GMT157	khanah+ehfije@gmail.com	2000-12-11 19:00:00	$2b$10$ft40X9vRvEepLI3DZ5FkCuTAngJGyClvngZpQzYUwXs.rjzAz9.Mi	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-01-27 19:46:51.178	121212121	2025-01-27 19:46:51.178	\N
72	vivekMon, 06 May 1991 18:30:00 GMT303	ranjan.ashwin02+vivek@gmail.com	1991-05-06 18:30:00	$2b$10$S1B18UF1X57fihURSO7kh.zUGEsIRORXddVFud1Mt.dpOzAgtHSRu	Admin	"{\\"line1\\":\\"asdasdasd\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"sdasdasd\\",\\"pincode\\":\\"646513\\"}"	\N	\N	7002385148	2025-01-27 20:49:06.176	Vivek	2025-01-27 20:49:06.176	\N
73	asdasdWed, 20 May 1992 18:30:00 GMT916	ranjan.ashwin02+yuvraj1@gmail.com	1992-05-20 18:30:00	$2b$10$Q0UnZA8e3ryWM7AsghmxNOLyOuSMXDCxJTMcqw2dY6tjPlv427nJe	Admin	"{\\"line1\\":\\"asdasdasd\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"adsasdasd\\",\\"pincode\\":\\"123123\\"}"	\N	\N	9416482163	2025-01-27 21:01:35.693	asdasd	2025-01-27 21:01:35.693	\N
74	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT440	zeeshan.harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$E9W7KTwDW.9Mbf34p6XrhehZWTVmaG5HqNyQosdlWzHV5PcC4Dn.i	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-01-28 08:40:23.811	Muhammad Zeeshan	2025-01-28 08:40:23.811	\N
75	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT551	ali+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$JnMfAq4Zz0xi9LfrL3c8VOtCEmHP31TKJUyxgFRu76lhQBsz4uRdK	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565665656	2025-01-28 08:50:54.701	Muhammad Zeeshan	2025-01-28 08:50:54.701	\N
76	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT844	khanai+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$ZMH7UsVGThSlyC9CpC.8.Ov6yUsBmyPXDl9R624ghby5pZFkE5Llu	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6556655653	2025-01-28 09:03:24.164	Muhammad Zeeshan	2025-01-28 09:03:24.164	\N
77	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT388	kainat+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$XbYTuJef6NYGTIluqvTPsOirIAAh5I7/bK27vSe56qfdQwtW5ttgO	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-01-28 09:26:36.729	Muhammad Zeeshan	2025-01-28 09:26:36.729	\N
78	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT816	khanali.+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$4xuOw.bSYpH6dAh/1Q55FOlq5moky2MZsKm1xkahrGx44YUIoAQoK	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565565656	2025-01-28 09:32:22.919	Muhammad Zeeshan	2025-01-28 09:32:22.919	\N
79	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT543	kali.+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$Tk0PaQ.HZA5fiWr7zTYcPO5vD/UHtad6eLOEmquYz6/WVF/HOgLUC	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	5666556656	2025-01-28 09:44:26.681	Muhammad Zeeshan	2025-01-28 09:44:26.681	\N
80	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT825	kai.+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$kUzMp1xAUI8ixHue5lkLZu7pHoMu.EYFvAvigiAhOV2JJCC5BnPDe	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656656	2025-01-28 09:54:02.096	Muhammad Zeeshan	2025-01-28 09:54:02.096	\N
81	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT687	ai.+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$AgMZm8QQfJ8ZdJBmtLYmxud/Cfd7qslerdA6JSIxz1Bah6sn56W/u	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6564656566	2025-01-28 10:00:22.013	Muhammad Zeeshan	2025-01-28 10:00:22.013	\N
82	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT426	kkk.+harshkumar@gmail.com	2000-12-11 19:00:00	$2b$10$xC0KlZUCmj35W.nfSVJfruatXT2PJJ3p0AAeFEE5gGN/vhx4sE.Ta	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565665555	2025-01-28 10:14:28.838	Muhammad Zeeshan	2025-01-28 10:14:28.838	\N
83	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT66	muhammadxaid4@gmail.com	2000-12-11 19:00:00	$2b$10$S6T/cuEpiHRPnkyNkdU2CePCvhGiO8gAPYLccztnyn3lyRcAxeuXy	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656653	2025-01-28 10:53:21.768	Muhammad Zeeshan	2025-01-28 10:53:21.768	\N
84	muhammadzeeshanWed, 20 Dec 2000 19:00:00 GMT512	muhammad4@gmail.com	2000-12-20 19:00:00	$2b$10$ZcoVSUJk5sPv.iupDpjdjed9DwRBGh4454hopW0eaCqXO3F49eUju	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656665	2025-01-28 11:07:39.355	Muhammad Zeeshan	2025-01-28 11:07:39.355	\N
85	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT196	muhammad+example@gmail.com	2000-12-11 19:00:00	$2b$10$GJ6bXjZ6QBJbJ2FGF7wNGOhap6xJL7UwxTnoEuIeWDr6p64aqXNSC	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6656565656	2025-01-28 11:13:19.956	Muhammad Zeeshan	2025-01-28 11:13:19.956	\N
86	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT906	muhammad.example@gmail.com	2000-12-11 19:00:00	$2b$10$ZA/yPEdKofR8KwXXNW8lzeGdC6EQFvwW1/.ouwLvybeV.dK/ZKba.	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6566565665	2025-01-28 11:18:46.422	Muhammad Zeeshan	2025-01-28 11:18:46.422	\N
87	asdasdTue, 02 May 1995 18:30:00 GMT127	ranjan.ashwin02+shibli@gmail.com	1995-05-02 18:30:00	$2b$10$pePIz7xE/VSy8PvGlVqYeOM2U3he1R51pH5cLUdoLa6P.eLLwP1p2	Admin	"{\\"line1\\":\\"asdasdasdasdsadasdad\\",\\"line2\\":\\"Chhattisgarh\\",\\"city\\":\\"dasdasd\\",\\"pincode\\":\\"413123\\"}"	\N	\N	9567706638	2025-01-28 12:40:51.57	asdasd	2025-01-28 12:40:51.57	\N
88	muhammadzeeshanTue, 11 Jan 2000 19:00:00 GMT30	muhamma.example@gmail.com	2000-01-11 19:00:00	$2b$10$U8FD0PbYCP4rQlRcYu2jyepp/t2DK4o8PMNYBgNScRrmjDPAUox4y	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6665656566	2025-01-28 13:23:22.754	Muhammad Zeeshan	2025-01-28 13:23:22.754	\N
89	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT880	muham4545mple@gmail.com	2000-12-11 19:00:00	$2b$10$NX7ZijzoH9gwzJPUBSGn7ukq0uBF9V80d0Y8AGF78RszzFFO7TWdG	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Goa\\",\\"city\\":\\"peshawar\\",\\"pincode\\":\\"250008\\"}"	\N	\N	5656544545	2025-01-28 17:06:03.66	Muhammad Zeeshan	2025-01-28 17:06:03.66	\N
90	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT598	muha5mple@gmail.com	2000-12-11 19:00:00	$2b$10$AuD2/cVYtDJARuH77LD3MesEpWACFuqgahs01MY6uUBsNLm93QcRK	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6655656565	2025-01-28 18:37:34.343	Muhammad Zeeshan	2025-01-28 18:37:34.343	\N
91	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT456	muha5mpe@gmail.com	2000-12-11 19:00:00	$2b$10$kpJYv/3m.SznK/7JQnjnaulw2S2msLIpgR4ii9ZUuzFkWYrYjeXuW	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-01-28 18:49:17.032	Muhammad Zeeshan	2025-01-28 18:49:17.032	\N
92	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT860	muhma5mpe@gmail.com	2000-12-11 19:00:00	$2b$10$SnuEa93JOBo9hjBSXyNM4.E7QdASj6J31nHN/CirSvrbf/IwFF2p.	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565545454	2025-01-28 19:06:51.81	Muhammad Zeeshan	2025-01-28 19:06:51.81	\N
93	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT886	ranjan.ashwin02subodh@gmail.com	2000-12-11 19:00:00	$2b$10$vZkqZVPSRAqWyZxl.ztYIOYynMmwZuGFPfJ3gYOhaOkchvTB6PvlC	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Chhattisgarh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6566565556	2025-01-29 04:10:37.882	Muhammad Zeeshan	2025-01-29 04:10:37.882	\N
94	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT804	ranjan.ashwin02bodh@gmail.com	2000-12-11 19:00:00	$2b$10$YpVZkKbpr4UhaTjNxM33lu3PWN2Ul./1cS9lLCdBXfRcfg0BBHWAG	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6776776776	2025-01-29 19:24:42.341	Muhammad Zeeshan	2025-01-29 19:24:42.341	\N
95	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT524	ranjan.aswin02boh@gmail.com	2000-12-11 19:00:00	$2b$10$ei0oQmnbLZzuE7PStz0lQOR6/d/eBZS4kMTKxraLqOWDcMCt9p3/u	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656656	2025-01-29 19:48:18.998	Muhammad Zeeshan	2025-01-29 19:48:18.998	\N
96	sucesslibraryTue, 07 May 1991 18:30:00 GMT778	ranjan.ashwin02+sucess@gmail.com	1991-05-07 18:30:00	$2b$10$1TBPdgpvBNxN56uL5F7kMuDSH.Plqq9huOnPG8KSWCRK5HQa0JEZO	Admin	"{\\"line1\\":\\"asdfasdfasdfasdfasdfasdfadsfadf\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"Gaya\\",\\"pincode\\":\\"823001\\"}"	\N	\N	6398169989	2025-01-30 20:07:46.922	Sucess Library	2025-01-30 20:07:46.922	\N
97	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT503	ranjan.ashw+sdh@gmail.com	2000-12-11 19:00:00	$2b$10$O28U6hFBJ6YMkouyIptxYeeHzoFbg/qcVgvoP.DQrnaHmfAjeiKUC	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565654656	2025-02-02 06:45:16.64	Muhammad Zeeshan	2025-02-02 06:45:16.64	\N
98	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT998	ranjan.ashsdh@gmail.com	2000-12-11 19:00:00	$2b$10$9x/SNv/ftC1fQszRhNSGUeNu7cZG0.fKmyRD3pr64XiLi56XSkP5W	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656656	2025-02-02 08:06:02.138	Muhammad Zeeshan	2025-02-02 08:06:02.138	\N
99	muhammadzeeshanSat, 11 Dec 1999 19:00:00 GMT580	rann.ashwin02+subodh@gmail.com	1999-12-11 19:00:00	$2b$10$dyxORARCdW/LYmqMF5ZTiucklWWbQcJXK/aU0K4Xwlz3RoEU3hTpu	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Gujarat\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565655465	2025-02-02 16:51:27.798	Muhammad Zeeshan	2025-02-02 16:51:27.798	\N
100	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT595	rann.ashwin+subodh@gmail.com	2000-12-11 19:00:00	$2b$10$d8pQlW3ubU.8JkAPP6tUbemhEHb3xTxw0jgq0lZA4rnnjnuHdSKYC	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-02-03 15:29:09.058	Muhammad Zeeshan	2025-02-03 15:29:09.058	\N
102	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT475	rann.ashn+subodh@gmail.com	2000-12-11 19:00:00	$2b$10$nSchFqc1CrQcqDHB66MwBOFqIAF7SO.JawzQ2c9TxviR681GfYdjm	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Haryana\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-02-03 16:30:28.481	Muhammad Zeeshan	2025-02-03 16:30:28.481	\N
103	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT822	rann.as22subodh@gmail.com	2000-12-11 19:00:00	$2b$10$SSKVdwa0dZHd1Ad5pstRH.mH4hYNy.eB/5Wq0YUjBSyTnui2PMWb2	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6566565665	2025-02-04 03:40:38.478	Muhammad Zeeshan	2025-02-04 03:40:38.478	\N
104	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT242	rann.assubodh@gmail.com	2000-12-11 19:00:00	$2b$10$0uF/dTmnArFutWQklSLrtO5P1HhYu1jtC7.vNedYkBXpZKiKYtliq	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6656565566	2025-02-04 04:50:53.176	Muhammad Zeeshan	2025-02-04 04:50:53.176	\N
105	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT428	rann.as222ubodh@gmail.com	2000-12-11 19:00:00	$2b$10$vrM49E1FA.oX1IgEk4tpfuoD2M6LtvEZsnSo1Wuqm4ZXWus2ja8vW	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Arunachal Pradesh\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6565656565	2025-02-04 05:11:56.916	Muhammad Zeeshan	2025-02-04 05:11:56.916	\N
106	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT308	muhamma22zeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$whAbN84WrlQFb2Wq39vo/O2UiE3BUIrW35Jtgq3PALW1xb6.iwsyi	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Andhra Pradesh\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250002\\"}"	\N	\N	6565655656	2025-02-06 19:57:23.828	Muhammad Zeeshan	2025-02-06 19:57:23.828	\N
107	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT569	muhamma2zeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$cyWyydcQ73PARAPEwYn8gu/uhohrem.NA5cw0d3oQlRTT9WZGPepC	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Assam\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"725000\\"}"	\N	\N	6565656565	2025-02-06 19:59:44.184	Muhammad Zeeshan	2025-02-06 19:59:44.184	\N
109	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT192	muham22a2zeeshan038@gmail.com	2000-12-11 19:00:00	$2b$10$8ueRDFRwivAMHkRij2kF/O0Xi/MV1/7QFbVCaVZkvjP806RB0AW/.	Admin	"{\\"line1\\":\\"swabi kpk\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"Peshawar\\",\\"pincode\\":\\"250002\\"}"	\N	\N	6565656656	2025-02-07 07:08:22.22	Muhammad Zeeshan	2025-02-07 07:08:22.22	\N
17	dyryrThu Jan 09 2025 00:00:00 GMT+0530 (India Standard Time)745	subodhe987+656@gmail.com	2025-01-08 18:30:00	$2b$10$uKu8MVy7ARItb9/wDQegReM5nzup2zoezcMNextdt8SxNOPQN89q6	Admin	"{\\"line1\\":\\"teretertret\\",\\"line2\\":\\"Manipur\\",\\"city\\":\\"trret\\",\\"pincode\\":\\"etrert\\"}"	\N	\N	8873509801	2025-01-15 13:31:40.918	Rahul \n	2025-01-15 13:31:40.918	\N
110	muhammadzeeshanMon, 11 Dec 2000 19:00:00 GMT902	rann.as222u3bodh@gmail.com	2000-12-11 19:00:00	$2b$10$27EZAmWQk9oKOoOWhG9l1OEzZu00z/EvhVEINub4AfaINB2KJIaDu	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Bihar\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6564564567	2025-02-07 09:06:41.001	Muhammad Zeeshan	2025-02-07 09:06:41.001	\N
111	muhammadzeeshanSun, 10 Dec 2000 19:00:00 GMT514	rann.as2222u3bodh@gmail.com	2000-12-10 19:00:00	$2b$10$49O/zL4hl4PpJNoDXwPFQuJrJVpV.YHEUovxkqK9YJ3Rg4Ub8jbKa	Admin	"{\\"line1\\":\\"family Mart kernal sher killi shewa adda (swabi)\\",\\"line2\\":\\"Goa\\",\\"city\\":\\"swabi\\",\\"pincode\\":\\"234302\\"}"	\N	\N	6556565656	2025-02-07 09:40:28.988	Muhammad Zeeshan	2025-02-07 09:40:28.988	\N
3	harshkumarsawThu Jan 08 2015 00:00:00 GMT-0800 (Pacific Standard Time)382	mister.harshkumar@gmail.com	2015-01-08 08:00:00	$2a$10$XjyNTERmX6gbSFZAfLHi9uQLh07r4gwImbIriyKR27bhaRskOC06C	Owner	"{\\"line1\\":\\"QTR A/4 ,LIC COLONY, SEC 5/B\\",\\"line2\\":\\"Jharkhand\\",\\"city\\":\\"MOHALI\\",\\"pincode\\":\\"827006\\"}"	\N	\N	7991168441	2025-01-14 09:44:23.008	Harsh kumar saw	2025-01-14 09:44:23.008	\N
\.


--
-- Data for Name: Amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Amenities" (id, "libraryId", amenities) FROM stdin;
2	2	["coldWater", "wifi", "ac", "locker", "separateWashroom", "News", "discussionArea", "LunchArea", "MovingChair", "FloorMat", "SeparateParking", "CommonParking"]
3	3	["coldWater", "wifi", "ac", "locker", "separateWashroom", "News", "discussionArea", "LunchArea", "MovingChair", "FloorMat", "SeparateParking", "CommonParking"]
4	4	["coldWater", "wifi", "ac", "locker", "separateWashroom", "News", "discussionArea", "LunchArea", "MovingChair", "FloorMat", "SeparateParking", "CommonParking"]
6	6	["coldWater", "wifi", "ac", "locker", "separateWashroom", "News", "discussionArea", "LunchArea", "MovingChair", "FloorMat", "SeparateParking", "CommonParking"]
8	8	["coldWater", "wifi", "ac", "locker", "separateWashroom", "News", "discussionArea", "LunchArea", "MovingChair", "FloorMat", "SeparateParking", "CommonParking"]
10	10	[]
11	11	[]
12	12	[]
13	13	[]
15	15	[]
7	7	[]
16	16	[]
17	17	[]
18	18	[]
19	19	[]
20	20	["Cold Water", "Wifi", "Locker"]
5	5	["wifi", "ac", "water", "Newspaper", "CommonParking"]
21	21	["Cold Water", "Locker", "Moving Chair"]
22	22	["Cold Water", "Wifi", "Lunch Area", "Common Parking"]
23	23	["Cold Water", "Wifi", "Separate Room For Boy's"]
24	24	["Ac", "Locker", "Separate Washroom"]
25	25	["Cold Water", "Wifi", "Moving Chair"]
14	14	["wifi", "powerBackup", "ac", "peacefulEnvironment", "coldWater", "News", "separateSeat", "selfStudyZone", "CCTV", "locker", "separateWashroom"]
1	1	["coldWater", "wifi", "ac", "locker", "separateWashroom", "News", "discussionArea", "LunchArea", "MovingChair", "FloorMat", "SeparateParking", "CommonParking"]
\.


--
-- Data for Name: App; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."App" (id, "Banner") FROM stdin;
6	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736846790/profile-images/ggbygmxc75yffm1dq9uj.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736846790/profile-images/tlyug5w5zdqlvpqxcd7b.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1740769837/Ekagra_Promotion_3_xivbnt.png,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1740769559/1_dttoko.png,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1740823785/Ekagra_Promotion_5_uoezrc.png}
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (id, "libraryId", "userId", approved, "bookedSeat", "bookingDate", "bookingFinalDate", "bookingPeriod", "bookingStatus", "finalPrice", "initialPrice", paid, "roomNo", "timeSlotDetails", "timeStamp", "transactionDetails") FROM stdin;
310	2	7	f	{"id": 534, "roomId": 27, "seatId": "0-0", "rotation": 270, "seatName": "10", "seatLabel": "10", "timeSlots": [{"id": 2317, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 534, "slotId": "4fc6ed1e-7c12-497b-8fdf-996e69eb81ef", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2318, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": true, "seatId": 534, "slotId": "4c080aec-c188-43c4-bc80-f59fa630caa2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2314, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": true, "seatId": 534, "slotId": "37d3f56d-3594-41cd-8bef-abb1e7fca156", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2315, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": true, "seatId": 534, "slotId": "978e9b5d-cefd-40e8-8780-760248825f09", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2316, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": true, "seatId": 534, "slotId": "16a99edc-4105-4f5c-b932-3eed746124a2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}]}	2025-03-01 06:45:15.148	2025-04-01 06:45:15.148	1	PENDING	200	200	f	1	[{"id": 2317, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 534, "slotId": "4fc6ed1e-7c12-497b-8fdf-996e69eb81ef", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 06:46:32.831	\N
311	2	7	f	{"id": 510, "roomId": 27, "seatId": "0-2", "rotation": 90, "seatName": "11", "seatLabel": "11", "timeSlots": [{"id": 2194, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 510, "slotId": "41985c57-8a4c-4475-ad43-883aa71f30c5", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2195, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 510, "slotId": "3d3080cc-6b3c-43f4-ac06-627a417a1500", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2196, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 510, "slotId": "8be5d85b-5f88-4975-9fcc-7375e98917cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2197, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 510, "slotId": "663dfcfb-da12-457f-8c21-9123eaf57a3a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2198, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 510, "slotId": "8df02ce6-4902-433f-9c7f-bee008d114d4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 07:24:45.751	2025-04-01 07:24:45.751	1	PENDING	700	200	f	1	[{"id": 2195, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 510, "slotId": "3d3080cc-6b3c-43f4-ac06-627a417a1500", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2196, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 510, "slotId": "8be5d85b-5f88-4975-9fcc-7375e98917cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 07:25:03.451	\N
312	2	7	f	{"id": 516, "roomId": 27, "seatId": "4-2", "rotation": 90, "seatName": "15", "seatLabel": "15", "timeSlots": [{"id": 2225, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": true, "seatId": 516, "slotId": "fa52a4b3-a3b7-4187-b2a7-d6c1c992186b", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2224, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 516, "slotId": "b1334c05-6bf9-468a-85a4-f51f96578451", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2227, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 516, "slotId": "eb4517bb-488b-47f2-b6ef-d20e44b9ab72", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2226, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": true, "seatId": 516, "slotId": "a609065b-8024-4492-bfb3-a1233581fbee", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2228, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": true, "seatId": 516, "slotId": "e5fe35e7-a310-42a7-926a-0c2d369ab330", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}]}	2025-03-01 07:28:05.67	2025-04-01 07:28:05.67	1	PENDING	200	700	f	1	[{"id": 2224, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 516, "slotId": "b1334c05-6bf9-468a-85a4-f51f96578451", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 07:28:12.858	\N
313	2	7	f	{"id": 510, "roomId": 27, "seatId": "0-2", "rotation": 90, "seatName": "11", "seatLabel": "11", "timeSlots": [{"id": 2194, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 510, "slotId": "41985c57-8a4c-4475-ad43-883aa71f30c5", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2195, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 510, "slotId": "3d3080cc-6b3c-43f4-ac06-627a417a1500", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2196, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 510, "slotId": "8be5d85b-5f88-4975-9fcc-7375e98917cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2197, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 510, "slotId": "663dfcfb-da12-457f-8c21-9123eaf57a3a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2198, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 510, "slotId": "8df02ce6-4902-433f-9c7f-bee008d114d4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 07:46:31.875	2025-04-01 07:46:31.875	1	PENDING	350	200	f	1	[{"id": 2196, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 510, "slotId": "8be5d85b-5f88-4975-9fcc-7375e98917cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 07:47:38.02	\N
314	2	35	f	{"id": 558, "roomId": 29, "seatId": "2-8", "rotation": 180, "seatName": "54", "seatLabel": "54", "timeSlots": [{"id": 2426, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 558, "slotId": "3e0e3bbf-2e9a-4dda-8beb-3be3ed1050a5", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2427, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 558, "slotId": "33cfcb3a-edab-4d9e-b93c-3291de796663", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2428, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 558, "slotId": "5fb5331f-88f3-4a38-8813-9fbb9a53f228", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2429, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 558, "slotId": "775b926b-21e5-40a4-b369-daae30430a9d", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2430, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 558, "slotId": "0a67b880-89c0-47e8-b62d-d997f9a28349", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 08:22:13.832	2025-04-01 08:22:13.832	1	PENDING	350	0	f	2	[{"id": 2428, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 558, "slotId": "5fb5331f-88f3-4a38-8813-9fbb9a53f228", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 08:22:30.698	\N
315	2	7	f	{"id": 535, "roomId": 27, "seatId": "1-0", "rotation": 270, "seatName": "9", "seatLabel": "9", "timeSlots": [{"id": 2319, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 535, "slotId": "54baf5dc-546a-4c11-ab90-3cdf15a05988", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2320, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 535, "slotId": "01d10fcc-069f-47d3-886f-330665705a76", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2321, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 535, "slotId": "25748c64-5fc4-4635-b985-6adb1af93ff6", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2322, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 535, "slotId": "ed30aefa-35af-4def-b673-c5aa769f064d", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2323, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 535, "slotId": "b55b8b73-d844-4f73-9126-6f86578f7559", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 08:24:48.995	2025-04-01 08:24:48.995	1	PENDING	700	350	f	1	[{"id": 2320, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 535, "slotId": "01d10fcc-069f-47d3-886f-330665705a76", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2321, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 535, "slotId": "25748c64-5fc4-4635-b985-6adb1af93ff6", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 08:26:27.667	\N
316	2	7	f	{"id": 558, "roomId": 29, "seatId": "2-8", "rotation": 180, "seatName": "54", "seatLabel": "54", "timeSlots": [{"id": 2426, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 558, "slotId": "3e0e3bbf-2e9a-4dda-8beb-3be3ed1050a5", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2427, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 558, "slotId": "33cfcb3a-edab-4d9e-b93c-3291de796663", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2428, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 558, "slotId": "5fb5331f-88f3-4a38-8813-9fbb9a53f228", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2429, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 558, "slotId": "775b926b-21e5-40a4-b369-daae30430a9d", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2430, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 558, "slotId": "0a67b880-89c0-47e8-b62d-d997f9a28349", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 09:17:29.223	2025-04-01 09:17:29.223	1	PENDING	700	0	f	2	[{"id": 2427, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 558, "slotId": "33cfcb3a-edab-4d9e-b93c-3291de796663", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2428, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 558, "slotId": "5fb5331f-88f3-4a38-8813-9fbb9a53f228", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 09:17:49.043	\N
317	5	9	f	{"id": 398, "roomId": 23, "seatId": "1-2", "rotation": 0, "seatName": "54", "seatLabel": "15", "timeSlots": [{"id": 1657, "to": "10:00 AM", "from": "06:00 AM", "price": 250, "booked": false, "seatId": 398, "slotId": "51516aa0-0d2d-46a5-908f-918532b7d27c", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1658, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 398, "slotId": "12701d80-8614-44af-a65e-162c462a7476", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1659, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 398, "slotId": "8eeeba6f-99aa-4763-ae5f-01e1b0d328cc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1660, "to": "10:00 PM", "from": "06:00 PM", "price": 250, "booked": false, "seatId": 398, "slotId": "dbe4fc06-31fd-4d64-b589-45a05f723005", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1661, "to": "11:59 PM", "from": "12:00 AM", "price": 800, "booked": false, "seatId": 398, "slotId": "fc62d2ce-00a2-43aa-af64-30a92a4a32bc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 09:19:22.854	2025-04-01 09:19:22.854	1	PENDING	300	0	f	1	[{"id": 1659, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 398, "slotId": "8eeeba6f-99aa-4763-ae5f-01e1b0d328cc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 09:19:29.688	\N
318	2	9	f	{"id": 519, "roomId": 27, "seatId": "5-2", "rotation": 90, "seatName": "16", "seatLabel": "16", "timeSlots": [{"id": 2239, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 519, "slotId": "60f856df-e2d6-4192-9543-a9da987ee169", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2240, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 519, "slotId": "64edcb42-4fb4-4964-a64a-a6232b960887", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2241, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 519, "slotId": "3635c71e-9744-489f-8cd8-5c8e2c6fe522", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2242, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 519, "slotId": "2f9b8e15-c9bf-424f-b003-a799cb1a4726", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2243, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 519, "slotId": "3a8dd625-57ee-4d1b-a7fa-9da4a0909c9f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 09:19:48.524	2025-04-01 09:19:48.524	1	PENDING	350	300	f	1	[{"id": 2241, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 519, "slotId": "3635c71e-9744-489f-8cd8-5c8e2c6fe522", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 09:19:54.597	\N
319	2	9	f	{"id": 512, "roomId": 27, "seatId": "1-3", "rotation": 270, "seatName": "29", "seatLabel": "29", "timeSlots": [{"id": 2204, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 512, "slotId": "4c146781-f449-4ae2-9589-65421e4f4c61", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2205, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 512, "slotId": "c55c1c6f-55d7-4320-9c22-8da366bcbbb2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2206, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 512, "slotId": "70fee6db-def3-4916-ab84-248841ab9406", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2207, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 512, "slotId": "fa84bea7-4d87-4490-a1b4-5f0b30fd8b8f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2208, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 512, "slotId": "06e01100-bb3a-4949-8335-ad2b4784e86d", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 09:44:56.625	2025-04-01 09:44:56.625	1	PENDING	350	350	f	1	[{"id": 2206, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 512, "slotId": "70fee6db-def3-4916-ab84-248841ab9406", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 09:45:03.243	\N
320	2	9	f	{"id": 512, "roomId": 27, "seatId": "1-3", "rotation": 270, "seatName": "29", "seatLabel": "29", "timeSlots": [{"id": 2204, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 512, "slotId": "4c146781-f449-4ae2-9589-65421e4f4c61", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2205, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 512, "slotId": "c55c1c6f-55d7-4320-9c22-8da366bcbbb2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2206, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 512, "slotId": "70fee6db-def3-4916-ab84-248841ab9406", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2207, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 512, "slotId": "fa84bea7-4d87-4490-a1b4-5f0b30fd8b8f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2208, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 512, "slotId": "06e01100-bb3a-4949-8335-ad2b4784e86d", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 09:44:56.625	2025-04-01 09:44:56.625	1	PENDING	350	350	f	1	[{"id": 2206, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 512, "slotId": "70fee6db-def3-4916-ab84-248841ab9406", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 09:45:11.444	\N
321	13	9	f	{"id": 628, "roomId": 31, "seatId": "3-0", "rotation": 0, "seatName": "37", "seatLabel": "67", "timeSlots": [{"id": 2832, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 628, "slotId": "43758037-9911-4e9d-88f2-c41c3cef9052", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2833, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 628, "slotId": "4f0fc97b-6c76-4755-b4f6-627f067c5f84", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2834, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 628, "slotId": "4d4410eb-4423-4c57-a06a-f77f34a3e17e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2835, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 628, "slotId": "90cb57f3-5737-4e6d-b6fd-d1926c180707", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2836, "to": "11:59 PM", "from": "12:00 AM", "price": 1000, "booked": false, "seatId": 628, "slotId": "09b35365-1d02-4741-8513-6685e3a0a80e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2837, "to": "05:00 AM", "from": "10:00 PM", "price": 300, "booked": false, "seatId": 628, "slotId": "6312d027-146a-490e-8fac-1ea34937c675", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:05:05.204	2025-04-01 10:05:05.204	1	PENDING	700	0	f	1	[{"id": 2835, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 628, "slotId": "90cb57f3-5737-4e6d-b6fd-d1926c180707", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:05:10.425	\N
322	13	9	f	{"id": 629, "roomId": 31, "seatId": "3-1", "rotation": 0, "seatName": "36", "seatLabel": "68", "timeSlots": [{"id": 2838, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 629, "slotId": "8ba84aff-ac54-4bb3-8e50-1034ff177cb4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2839, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 629, "slotId": "97fbf2cd-96a5-45d7-99ec-486a409044e3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2840, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 629, "slotId": "aadd7004-167a-49ff-94fb-ee2cf7ff82a2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2841, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 629, "slotId": "5c877c1a-1f8e-4400-8876-8d74abe995c8", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2842, "to": "11:59 PM", "from": "12:00 AM", "price": 1000, "booked": false, "seatId": 629, "slotId": "9fb872ab-f169-4f18-a5ff-7c3ea803c83b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2843, "to": "05:00 AM", "from": "10:00 PM", "price": 300, "booked": false, "seatId": 629, "slotId": "a974f2f9-c40a-42e1-95fc-e32230cd24ef", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:15:44.273	2025-04-01 10:15:44.273	1	PENDING	200	200	f	1	[{"id": 2841, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 629, "slotId": "5c877c1a-1f8e-4400-8876-8d74abe995c8", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:15:49.902	\N
324	2	9	f	{"id": 511, "roomId": 27, "seatId": "1-2", "rotation": 90, "seatName": "12", "seatLabel": "12", "timeSlots": [{"id": 2199, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 511, "slotId": "29f224cb-b47d-4c8c-b771-3547a934c620", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2200, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 511, "slotId": "27f85b57-d7ce-4179-82c8-97d05692f121", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2201, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 511, "slotId": "b53b4189-ca46-4e72-ab6f-a4c52da4b5cc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2202, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 511, "slotId": "3aa4eb52-f6b1-45b5-a8bb-b552c2d60b0e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2203, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 511, "slotId": "18e74af4-0f67-43f2-b37d-9adb3ada0553", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:25:07.105	2025-04-01 10:25:07.105	1	PENDING	350	200	f	1	[{"id": 2201, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 511, "slotId": "b53b4189-ca46-4e72-ab6f-a4c52da4b5cc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:25:11.696	\N
325	2	9	f	{"id": 519, "roomId": 27, "seatId": "5-2", "rotation": 90, "seatName": "16", "seatLabel": "16", "timeSlots": [{"id": 2239, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 519, "slotId": "60f856df-e2d6-4192-9543-a9da987ee169", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2240, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 519, "slotId": "64edcb42-4fb4-4964-a64a-a6232b960887", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2241, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 519, "slotId": "3635c71e-9744-489f-8cd8-5c8e2c6fe522", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2242, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 519, "slotId": "2f9b8e15-c9bf-424f-b003-a799cb1a4726", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2243, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 519, "slotId": "3a8dd625-57ee-4d1b-a7fa-9da4a0909c9f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:25:07.105	2025-04-01 10:25:07.105	1	PENDING	350	350	f	1	[{"id": 2240, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 519, "slotId": "64edcb42-4fb4-4964-a64a-a6232b960887", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:25:49.044	\N
326	14	9	f	{"id": 665, "roomId": 32, "seatId": "2-2", "rotation": 450, "seatName": "24", "seatLabel": "24", "timeSlots": [{"id": 3029, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 665, "slotId": "32e0d4fc-370c-431c-9771-519f8b92e6b1", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3030, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 665, "slotId": "81ee0140-c31f-4bc9-b55e-e318bc78e673", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3031, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 665, "slotId": "8e130ff7-60d0-468f-bf77-fd2d7e81bef4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3032, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 665, "slotId": "ffef9f30-764c-4b18-869d-dace4c2e8141", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3033, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 665, "slotId": "2eac2043-1762-40d5-bf74-d0481c30ecd3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:26:10.292	2025-04-01 10:26:10.292	1	PENDING	300	350	f	1	[{"id": 3031, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 665, "slotId": "8e130ff7-60d0-468f-bf77-fd2d7e81bef4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:26:15	\N
327	2	9	f	{"id": 519, "roomId": 27, "seatId": "5-2", "rotation": 90, "seatName": "16", "seatLabel": "16", "timeSlots": [{"id": 2239, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 519, "slotId": "60f856df-e2d6-4192-9543-a9da987ee169", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2240, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 519, "slotId": "64edcb42-4fb4-4964-a64a-a6232b960887", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2241, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 519, "slotId": "3635c71e-9744-489f-8cd8-5c8e2c6fe522", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2242, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 519, "slotId": "2f9b8e15-c9bf-424f-b003-a799cb1a4726", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2243, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 519, "slotId": "3a8dd625-57ee-4d1b-a7fa-9da4a0909c9f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:26:21.078	2025-04-01 10:26:21.078	1	PENDING	350	300	f	1	[{"id": 2241, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 519, "slotId": "3635c71e-9744-489f-8cd8-5c8e2c6fe522", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:26:27.643	\N
328	14	9	f	{"id": 711, "roomId": 32, "seatId": "3-2", "rotation": 450, "seatName": "25", "seatLabel": "25", "timeSlots": [{"id": 3259, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 711, "slotId": "205c0d66-216d-4d56-b414-e1b2b2139113", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3260, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 711, "slotId": "c414d1f4-2cce-4487-9830-80576ca995de", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3261, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 711, "slotId": "80c14f50-337e-4fb8-8e0d-ced0be28a00f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3262, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 711, "slotId": "8b56113d-4aa8-4e2c-a98c-913e4bded9bc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3263, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 711, "slotId": "5ced7196-590c-4967-a4b3-cff0d27beff0", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:27:02.813	2025-04-01 10:27:02.813	1	PENDING	700	350	f	1	[{"id": 3263, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 711, "slotId": "5ced7196-590c-4967-a4b3-cff0d27beff0", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:27:07.232	\N
329	14	9	f	{"id": 666, "roomId": 32, "seatId": "4-2", "rotation": 90, "seatName": "26", "seatLabel": "26", "timeSlots": [{"id": 3034, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 666, "slotId": "f56e8eca-58f0-4de7-a8a3-1a00d131991a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3035, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 666, "slotId": "2766fbc4-181f-48a4-a892-6492421bc062", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3036, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 666, "slotId": "94b4bcef-0be0-4385-b056-2d87d157842a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3037, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 666, "slotId": "b2c21a6e-eaa5-43de-a33a-9b7f4dbf7878", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3038, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 666, "slotId": "cd22e35c-90cf-48b7-9617-ae2d7ddce561", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:27:33.05	2025-04-01 10:27:33.05	1	PENDING	700	700	f	1	[{"id": 3038, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 666, "slotId": "cd22e35c-90cf-48b7-9617-ae2d7ddce561", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:27:37.912	\N
323	13	9	f	{"id": 628, "roomId": 31, "seatId": "3-0", "rotation": 0, "seatName": "37", "seatLabel": "67", "timeSlots": [{"id": 2832, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 628, "slotId": "43758037-9911-4e9d-88f2-c41c3cef9052", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2833, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 628, "slotId": "4f0fc97b-6c76-4755-b4f6-627f067c5f84", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2834, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 628, "slotId": "4d4410eb-4423-4c57-a06a-f77f34a3e17e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2835, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 628, "slotId": "90cb57f3-5737-4e6d-b6fd-d1926c180707", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2836, "to": "11:59 PM", "from": "12:00 AM", "price": 1000, "booked": false, "seatId": 628, "slotId": "09b35365-1d02-4741-8513-6685e3a0a80e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2837, "to": "05:00 AM", "from": "10:00 PM", "price": 300, "booked": false, "seatId": 628, "slotId": "6312d027-146a-490e-8fac-1ea34937c675", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 10:15:44.273	2025-04-01 10:15:44.273	1	CANCELLED	200	200	f	1	[{"id": 2835, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 628, "slotId": "90cb57f3-5737-4e6d-b6fd-d1926c180707", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:24:45.987	\N
331	2	7	f	{"id": 510, "roomId": 27, "seatId": "0-2", "rotation": 90, "seatName": "11", "seatLabel": "11", "timeSlots": [{"id": 2194, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 510, "slotId": "41985c57-8a4c-4475-ad43-883aa71f30c5", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2195, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 510, "slotId": "3d3080cc-6b3c-43f4-ac06-627a417a1500", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2196, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 510, "slotId": "8be5d85b-5f88-4975-9fcc-7375e98917cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2197, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 510, "slotId": "663dfcfb-da12-457f-8c21-9123eaf57a3a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2198, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 510, "slotId": "8df02ce6-4902-433f-9c7f-bee008d114d4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 11:27:49.842	2025-04-01 11:27:49.842	1	PENDING	350	700	f	1	[{"id": 2195, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 510, "slotId": "3d3080cc-6b3c-43f4-ac06-627a417a1500", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 11:28:03.424	\N
330	2	9	f	{"id": 534, "roomId": 27, "seatId": "0-0", "rotation": 270, "seatName": "10", "seatLabel": "10", "timeSlots": [{"id": 2317, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 534, "slotId": "4fc6ed1e-7c12-497b-8fdf-996e69eb81ef", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2318, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": true, "seatId": 534, "slotId": "4c080aec-c188-43c4-bc80-f59fa630caa2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2314, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": true, "seatId": 534, "slotId": "37d3f56d-3594-41cd-8bef-abb1e7fca156", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2315, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": true, "seatId": 534, "slotId": "978e9b5d-cefd-40e8-8780-760248825f09", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2316, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": true, "seatId": 534, "slotId": "16a99edc-4105-4f5c-b932-3eed746124a2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}]}	2025-03-01 10:59:52.968	2025-04-01 10:59:52.968	1	CANCELLED	200	700	f	1	[{"id": 2317, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 534, "slotId": "4fc6ed1e-7c12-497b-8fdf-996e69eb81ef", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 10:59:58.306	\N
332	2	7	f	{"id": 510, "roomId": 27, "seatId": "0-2", "rotation": 90, "seatName": "11", "seatLabel": "11", "timeSlots": [{"id": 2194, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 510, "slotId": "41985c57-8a4c-4475-ad43-883aa71f30c5", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2195, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 510, "slotId": "3d3080cc-6b3c-43f4-ac06-627a417a1500", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2196, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 510, "slotId": "8be5d85b-5f88-4975-9fcc-7375e98917cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2197, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 510, "slotId": "663dfcfb-da12-457f-8c21-9123eaf57a3a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2198, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 510, "slotId": "8df02ce6-4902-433f-9c7f-bee008d114d4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 11:47:48.043	2025-04-01 11:47:48.043	1	PENDING	350	0	f	1	[{"id": 2196, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 510, "slotId": "8be5d85b-5f88-4975-9fcc-7375e98917cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 11:47:54.227	\N
333	14	7	f	{"id": 711, "roomId": 32, "seatId": "3-2", "rotation": 450, "seatName": "25", "seatLabel": "25", "timeSlots": [{"id": 3259, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 711, "slotId": "205c0d66-216d-4d56-b414-e1b2b2139113", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3260, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 711, "slotId": "c414d1f4-2cce-4487-9830-80576ca995de", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3261, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 711, "slotId": "80c14f50-337e-4fb8-8e0d-ced0be28a00f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3262, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 711, "slotId": "8b56113d-4aa8-4e2c-a98c-913e4bded9bc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3263, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 711, "slotId": "5ced7196-590c-4967-a4b3-cff0d27beff0", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-01 11:57:05.413	2025-04-01 11:57:05.413	1	PENDING	300	0	f	1	[{"id": 3261, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 711, "slotId": "80c14f50-337e-4fb8-8e0d-ced0be28a00f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-01 11:57:18.372	\N
336	2	3	f	{"id": 536, "roomId": 27, "seatId": "3-3", "rotation": 270, "seatName": "27", "seatLabel": "27", "timeSlots": [{"id": 2324, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 536, "slotId": "b0f9231e-635b-4c50-815e-043af07c1a0b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2327, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 536, "slotId": "5c690aa6-dcca-4dd4-b9fb-88fa3f970570", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2325, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": true, "seatId": 536, "slotId": "878882bc-1630-4770-8867-d2cdca429cb2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2326, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": true, "seatId": 536, "slotId": "b16d0354-d81d-4eea-8df6-a1fbb9fc5025", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2328, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": true, "seatId": 536, "slotId": "9f57bfd6-cae0-4e4c-8a2f-c603fad765de", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}]}	2025-03-02 08:23:11.508	2025-04-02 08:23:11.508	1	PENDING	200	0	f	1	[{"id": 2324, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 536, "slotId": "b0f9231e-635b-4c50-815e-043af07c1a0b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 08:23:20.796	\N
335	2	40	f	{"id": 529, "roomId": 27, "seatId": "7-0", "rotation": 270, "seatName": "3", "seatLabel": "3", "timeSlots": [{"id": 2289, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 529, "slotId": "1274143c-b532-495d-9ede-58e777213ff3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2290, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 529, "slotId": "948d9106-902b-4465-a301-73c8a65573a6", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2291, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 529, "slotId": "3bb5cb5e-f28e-487c-991b-141763348a67", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2292, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 529, "slotId": "ea5054fe-7bbe-4450-a51c-9566d386efc0", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2293, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 529, "slotId": "c6d004e5-5506-4459-93b2-ae9b2f349315", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 08:01:45.931	2025-04-02 08:01:45.931	1	CANCELLED	550	0	f	1	[{"id": 2291, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 529, "slotId": "3bb5cb5e-f28e-487c-991b-141763348a67", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2292, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 529, "slotId": "ea5054fe-7bbe-4450-a51c-9566d386efc0", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 08:02:06.33	\N
337	2	3	f	{"id": 536, "roomId": 27, "seatId": "3-3", "rotation": 270, "seatName": "27", "seatLabel": "27", "timeSlots": [{"id": 2324, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 536, "slotId": "b0f9231e-635b-4c50-815e-043af07c1a0b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2327, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 536, "slotId": "5c690aa6-dcca-4dd4-b9fb-88fa3f970570", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2325, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": true, "seatId": 536, "slotId": "878882bc-1630-4770-8867-d2cdca429cb2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2326, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": true, "seatId": 536, "slotId": "b16d0354-d81d-4eea-8df6-a1fbb9fc5025", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2328, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": true, "seatId": 536, "slotId": "9f57bfd6-cae0-4e4c-8a2f-c603fad765de", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}]}	2025-03-02 08:23:11.508	2025-04-02 08:23:11.508	1	PENDING	200	200	f	1	[{"id": 2327, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 536, "slotId": "5c690aa6-dcca-4dd4-b9fb-88fa3f970570", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 08:24:26.397	\N
339	2	7	f	{"id": 529, "roomId": 27, "seatId": "7-0", "rotation": 270, "seatName": "3", "seatLabel": "3", "timeSlots": [{"id": 2289, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 529, "slotId": "1274143c-b532-495d-9ede-58e777213ff3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2290, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 529, "slotId": "948d9106-902b-4465-a301-73c8a65573a6", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2291, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 529, "slotId": "3bb5cb5e-f28e-487c-991b-141763348a67", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2292, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 529, "slotId": "ea5054fe-7bbe-4450-a51c-9566d386efc0", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2293, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 529, "slotId": "c6d004e5-5506-4459-93b2-ae9b2f349315", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 08:32:30.813	2025-04-02 08:32:30.813	1	PENDING	350	0	f	1	[{"id": 2291, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 529, "slotId": "3bb5cb5e-f28e-487c-991b-141763348a67", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 08:32:41.991	\N
340	14	7	f	{"id": 642, "roomId": 32, "seatId": "16-2", "rotation": 0, "seatName": "4", "seatLabel": "4", "timeSlots": [{"id": 2914, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 642, "slotId": "503f3261-b4c0-4b49-aac1-f8261813b21b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2915, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 642, "slotId": "f528f82e-7cfb-490a-a82d-af949da44b31", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2916, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 642, "slotId": "93bebe71-087a-4c83-9728-4be9220f00af", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2917, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 642, "slotId": "77386e51-876f-40e9-81dd-f01b5be1881f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2918, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 642, "slotId": "446cc8e4-6668-43cf-b2f3-732d84b8a80f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 08:33:31.152	2025-04-02 08:33:31.152	1	PENDING	700	350	f	1	[{"id": 2918, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 642, "slotId": "446cc8e4-6668-43cf-b2f3-732d84b8a80f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 08:33:38.288	\N
338	2	9	f	{"id": 515, "roomId": 27, "seatId": "3-2", "rotation": 450, "seatName": "14", "seatLabel": "14", "timeSlots": [{"id": 2219, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 515, "slotId": "fc633884-4e65-4b4a-8a79-a5fbc1a3707b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2220, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 515, "slotId": "ef90f29a-547c-44ee-81d3-89b1ff13f03f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2221, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 515, "slotId": "d56f66e7-6067-42ef-a419-f549e44445fe", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2222, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 515, "slotId": "705b83a1-f7aa-4e47-99db-07bcaaf8999b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2223, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 515, "slotId": "2baa54bd-1914-4be6-8838-a29bc0adb070", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 08:31:11.039	2025-04-02 08:31:11.039	1	CONFIRMED	350	0	t	1	[{"id": 2221, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 515, "slotId": "d56f66e7-6067-42ef-a419-f549e44445fe", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 08:31:16.779	\N
341	14	7	f	{"id": 665, "roomId": 32, "seatId": "2-2", "rotation": 450, "seatName": "24", "seatLabel": "24", "timeSlots": [{"id": 3029, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 665, "slotId": "32e0d4fc-370c-431c-9771-519f8b92e6b1", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3030, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 665, "slotId": "81ee0140-c31f-4bc9-b55e-e318bc78e673", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3031, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 665, "slotId": "8e130ff7-60d0-468f-bf77-fd2d7e81bef4", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3032, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 665, "slotId": "ffef9f30-764c-4b18-869d-dace4c2e8141", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 3033, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 665, "slotId": "2eac2043-1762-40d5-bf74-d0481c30ecd3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 09:26:35.665	2025-04-02 09:26:35.665	1	PENDING	700	0	f	1	[{"id": 3033, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 665, "slotId": "2eac2043-1762-40d5-bf74-d0481c30ecd3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 09:26:41.138	\N
342	14	7	f	{"id": 646, "roomId": 32, "seatId": "16-7", "rotation": 0, "seatName": "77", "seatLabel": "77", "timeSlots": [{"id": 2934, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 646, "slotId": "b4b97ca4-7988-4a69-bc3e-cf037834156b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2935, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 646, "slotId": "8e3b2f9a-850b-4203-94f7-c9ce01e1edf0", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2936, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 646, "slotId": "ce9967c5-a954-4c57-99e7-5205d61445cb", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2937, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 646, "slotId": "ca5a62a0-b4e7-499c-b6cc-03e817beae86", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2938, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 646, "slotId": "97775e2d-193e-4bca-98d2-567c6fb0c7f1", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 09:26:35.665	2025-04-02 09:26:35.665	1	PENDING	700	700	f	1	[{"id": 2938, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 646, "slotId": "97775e2d-193e-4bca-98d2-567c6fb0c7f1", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 09:26:57.954	\N
343	14	7	f	{"id": 645, "roomId": 32, "seatId": "16-5", "rotation": 0, "seatName": "1", "seatLabel": "1", "timeSlots": [{"id": 2929, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 645, "slotId": "cf8c2c7f-952c-4056-bc41-b7f2355dcba5", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2930, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 645, "slotId": "9b7cf5e6-d0ae-4957-904f-3dcf26f2c768", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2931, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 645, "slotId": "8ff6f5d8-589d-49ed-b406-dcf20f6dc7ab", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2932, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 645, "slotId": "002c1625-ab94-4b88-a6f1-8406b1dcaac7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2933, "to": "06:00 AM", "from": "06:00 PM", "price": 700, "booked": false, "seatId": 645, "slotId": "8d1a8099-0be2-4a00-ac3b-74ae32448aa9", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 09:27:07.961	2025-04-02 09:27:07.961	1	PENDING	300	700	f	1	[{"id": 2932, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 645, "slotId": "002c1625-ab94-4b88-a6f1-8406b1dcaac7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 09:28:37.64	\N
344	2	7	f	{"id": 534, "roomId": 27, "seatId": "0-0", "rotation": 270, "seatName": "10", "seatLabel": "10", "timeSlots": [{"id": 2317, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 534, "slotId": "4fc6ed1e-7c12-497b-8fdf-996e69eb81ef", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2318, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": true, "seatId": 534, "slotId": "4c080aec-c188-43c4-bc80-f59fa630caa2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2314, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": true, "seatId": 534, "slotId": "37d3f56d-3594-41cd-8bef-abb1e7fca156", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2315, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": true, "seatId": 534, "slotId": "978e9b5d-cefd-40e8-8780-760248825f09", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}, {"id": 2316, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": true, "seatId": 534, "slotId": "16a99edc-4105-4f5c-b932-3eed746124a2", "bookedById": 3, "bookingSource": "admin", "bookingEndDate": "2025-03-01T00:00:00.000Z"}]}	2025-03-02 09:31:54.618	2025-04-02 09:31:54.618	1	PENDING	200	300	f	1	[{"id": 2317, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 534, "slotId": "4fc6ed1e-7c12-497b-8fdf-996e69eb81ef", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 09:32:06.112	\N
346	2	41	f	{"id": 557, "roomId": 29, "seatId": "3-7", "rotation": 0, "seatName": "58", "seatLabel": "58", "timeSlots": [{"id": 2421, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 557, "slotId": "eaaa7e10-e752-4d44-b148-bb01762a467a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2422, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 557, "slotId": "aa66f7f2-06ad-4450-8dc4-72c7856c01da", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2423, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 557, "slotId": "9c22b9a7-b134-4332-9cba-75f9a40fc9cd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2424, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 557, "slotId": "21dcb879-0502-43b0-9e5e-5bb9f3e2bcbc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2425, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 557, "slotId": "fce87d95-a650-42fd-862c-7b5d3574cff7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 09:53:00.607	2025-04-02 09:53:00.607	1	PENDING	700	0	f	2	[{"id": 2422, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 557, "slotId": "aa66f7f2-06ad-4450-8dc4-72c7856c01da", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2423, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 557, "slotId": "9c22b9a7-b134-4332-9cba-75f9a40fc9cd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 09:53:46.763	\N
347	2	41	f	{"id": 557, "roomId": 29, "seatId": "3-7", "rotation": 0, "seatName": "58", "seatLabel": "58", "timeSlots": [{"id": 2421, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 557, "slotId": "eaaa7e10-e752-4d44-b148-bb01762a467a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2422, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 557, "slotId": "aa66f7f2-06ad-4450-8dc4-72c7856c01da", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2423, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 557, "slotId": "9c22b9a7-b134-4332-9cba-75f9a40fc9cd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2424, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 557, "slotId": "21dcb879-0502-43b0-9e5e-5bb9f3e2bcbc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2425, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 557, "slotId": "fce87d95-a650-42fd-862c-7b5d3574cff7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 09:54:39.887	2025-04-02 09:54:39.887	1	CANCELLED	700	0	f	2	[{"id": 2422, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 557, "slotId": "aa66f7f2-06ad-4450-8dc4-72c7856c01da", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2423, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 557, "slotId": "9c22b9a7-b134-4332-9cba-75f9a40fc9cd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 09:54:57.875	\N
348	2	41	f	{"id": 557, "roomId": 29, "seatId": "3-7", "rotation": 0, "seatName": "58", "seatLabel": "58", "timeSlots": [{"id": 2421, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 557, "slotId": "eaaa7e10-e752-4d44-b148-bb01762a467a", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2422, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 557, "slotId": "aa66f7f2-06ad-4450-8dc4-72c7856c01da", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2423, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 557, "slotId": "9c22b9a7-b134-4332-9cba-75f9a40fc9cd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2424, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 557, "slotId": "21dcb879-0502-43b0-9e5e-5bb9f3e2bcbc", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2425, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 557, "slotId": "fce87d95-a650-42fd-862c-7b5d3574cff7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 09:59:25.169	2025-04-02 09:59:25.169	1	CONFIRMED	700	700	t	2	[{"id": 2422, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 557, "slotId": "aa66f7f2-06ad-4450-8dc4-72c7856c01da", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2423, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 557, "slotId": "9c22b9a7-b134-4332-9cba-75f9a40fc9cd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 09:59:37.122	\N
349	2	38	f	{"id": 555, "roomId": 29, "seatId": "3-6", "rotation": 0, "seatName": "59", "seatLabel": "59", "timeSlots": [{"id": 2411, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 555, "slotId": "af301b9d-c747-4884-a0ea-e0ea51774812", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2412, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 555, "slotId": "e5394531-80ae-4b73-8782-c3a2425bbaad", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2413, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 555, "slotId": "f82972c9-a121-4d94-bbc4-5fbe23467375", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2414, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 555, "slotId": "b35f4d6f-3ab0-4339-b1b0-04601c14ad88", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2415, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 555, "slotId": "21e5fecb-4d8e-4d59-b60a-64655bc92448", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 10:59:04.154	2025-04-02 10:59:04.154	1	PENDING	550	0	f	2	[{"id": 2411, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 555, "slotId": "af301b9d-c747-4884-a0ea-e0ea51774812", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2413, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 555, "slotId": "f82972c9-a121-4d94-bbc4-5fbe23467375", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 10:59:56.414	\N
351	2	42	f	{"id": 559, "roomId": 29, "seatId": "3-8", "rotation": 0, "seatName": "57", "seatLabel": "57", "timeSlots": [{"id": 2431, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 559, "slotId": "c228badf-0ee3-4bba-9633-0fcaf3bd255e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2432, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 559, "slotId": "d9dc9dcd-1a3d-428e-8a60-c429073691e2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2434, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 559, "slotId": "0c5c1586-0621-4d4a-adb4-584fed8851e7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2435, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 559, "slotId": "0cae28cc-9f3b-478a-a6f6-853589992684", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": true, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": 7, "bookingSource": "app", "bookingEndDate": "2025-03-02T12:32:43.077Z"}]}	2025-03-02 11:07:54.1	2025-04-02 11:07:54.1	1	PENDING	350	0	f	2	[{"id": 2432, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 559, "slotId": "d9dc9dcd-1a3d-428e-8a60-c429073691e2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 11:10:15.693	\N
350	2	38	f	{"id": 555, "roomId": 29, "seatId": "3-6", "rotation": 0, "seatName": "59", "seatLabel": "59", "timeSlots": [{"id": 2411, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 555, "slotId": "af301b9d-c747-4884-a0ea-e0ea51774812", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2412, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 555, "slotId": "e5394531-80ae-4b73-8782-c3a2425bbaad", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2413, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 555, "slotId": "f82972c9-a121-4d94-bbc4-5fbe23467375", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2414, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 555, "slotId": "b35f4d6f-3ab0-4339-b1b0-04601c14ad88", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2415, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 555, "slotId": "21e5fecb-4d8e-4d59-b60a-64655bc92448", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 11:01:21.965	2025-04-02 11:01:21.965	1	CONFIRMED	550	0	t	2	[{"id": 2411, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 555, "slotId": "af301b9d-c747-4884-a0ea-e0ea51774812", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2413, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 555, "slotId": "f82972c9-a121-4d94-bbc4-5fbe23467375", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 11:01:33.772	\N
352	2	42	f	{"id": 559, "roomId": 29, "seatId": "3-8", "rotation": 0, "seatName": "57", "seatLabel": "57", "timeSlots": [{"id": 2431, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 559, "slotId": "c228badf-0ee3-4bba-9633-0fcaf3bd255e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2432, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 559, "slotId": "d9dc9dcd-1a3d-428e-8a60-c429073691e2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2434, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 559, "slotId": "0c5c1586-0621-4d4a-adb4-584fed8851e7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2435, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 559, "slotId": "0cae28cc-9f3b-478a-a6f6-853589992684", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": 7, "bookingSource": "app", "bookingEndDate": "2025-03-02T12:32:43.077Z"}]}	2025-03-02 11:37:38.836	2025-04-02 11:37:38.836	1	CANCELLED	350	0	f	2	[{"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": 7, "bookingSource": "app", "bookingEndDate": "2025-03-02T12:32:43.077Z"}]	2025-03-02 11:38:07.626	\N
353	2	7	f	{"id": 559, "roomId": 29, "seatId": "3-8", "rotation": 0, "seatName": "57", "seatLabel": "57", "timeSlots": [{"id": 2431, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 559, "slotId": "c228badf-0ee3-4bba-9633-0fcaf3bd255e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2432, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 559, "slotId": "d9dc9dcd-1a3d-428e-8a60-c429073691e2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2434, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 559, "slotId": "0c5c1586-0621-4d4a-adb4-584fed8851e7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2435, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 559, "slotId": "0cae28cc-9f3b-478a-a6f6-853589992684", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": 7, "bookingSource": "app", "bookingEndDate": "2025-03-02T12:32:43.077Z"}]}	2025-03-02 12:33:38.534	2025-04-02 12:33:38.534	1	PENDING	350	0	f	2	[{"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": 7, "bookingSource": "app", "bookingEndDate": "2025-03-02T12:32:43.077Z"}]	2025-03-02 12:34:32.325	\N
354	2	3	f	{"id": 559, "roomId": 29, "seatId": "3-8", "rotation": 0, "seatName": "57", "seatLabel": "57", "timeSlots": [{"id": 2431, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 559, "slotId": "c228badf-0ee3-4bba-9633-0fcaf3bd255e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2432, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 559, "slotId": "d9dc9dcd-1a3d-428e-8a60-c429073691e2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2434, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 559, "slotId": "0c5c1586-0621-4d4a-adb4-584fed8851e7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2435, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 559, "slotId": "0cae28cc-9f3b-478a-a6f6-853589992684", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": 7, "bookingSource": "app", "bookingEndDate": "2025-03-02T12:32:43.077Z"}]}	2025-03-02 12:43:29.149	2025-04-02 12:43:29.149	1	PENDING	200	0	f	2	[{"id": 2434, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 559, "slotId": "0c5c1586-0621-4d4a-adb4-584fed8851e7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 12:43:42.047	\N
355	2	3	f	{"id": 559, "roomId": 29, "seatId": "3-8", "rotation": 0, "seatName": "57", "seatLabel": "57", "timeSlots": [{"id": 2431, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 559, "slotId": "c228badf-0ee3-4bba-9633-0fcaf3bd255e", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2432, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 559, "slotId": "d9dc9dcd-1a3d-428e-8a60-c429073691e2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2434, "to": "10:00 AM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 559, "slotId": "0c5c1586-0621-4d4a-adb4-584fed8851e7", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2435, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 559, "slotId": "0cae28cc-9f3b-478a-a6f6-853589992684", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": 7, "bookingSource": "app", "bookingEndDate": "2025-03-02T12:32:43.077Z"}]}	2025-03-02 12:45:15.704	2025-04-02 12:45:15.704	1	PENDING	900	0	f	2	[{"id": 2435, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 559, "slotId": "0cae28cc-9f3b-478a-a6f6-853589992684", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 12:52:47.884	\N
356	4	43	f	{"id": 351, "roomId": 22, "seatId": "1-0", "rotation": 270, "seatName": "53", "seatLabel": "53", "timeSlots": [{"id": 1422, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 351, "slotId": "92b47ca8-59ea-4d84-ba59-ceda30b0e2fa", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1423, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 351, "slotId": "a2467747-5131-4fa5-b61c-bc10f5c70dcd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1424, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 351, "slotId": "0998afc0-f4e9-401d-81ec-89e7c9a0915b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1425, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 351, "slotId": "722f0a64-f1a4-4d72-92a4-42551fc8ad1b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1426, "to": "11:59 PM", "from": "12:00 AM", "price": 1250, "booked": false, "seatId": 351, "slotId": "7ba7b282-c7b8-45a2-9dca-82750e140891", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 12:52:34.796	2025-04-02 12:52:34.796	1	PENDING	1100	0	f	1	[{"id": 1422, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 351, "slotId": "92b47ca8-59ea-4d84-ba59-ceda30b0e2fa", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1423, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 351, "slotId": "a2467747-5131-4fa5-b61c-bc10f5c70dcd", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 12:52:54.307	\N
357	4	43	f	{"id": 353, "roomId": 22, "seatId": "0-2", "rotation": 0, "seatName": "51", "seatLabel": "51", "timeSlots": [{"id": 1432, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 353, "slotId": "4f094e7e-8ea0-4d9b-93e0-3ad0b73ddf83", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1433, "to": "02:00 PM", "from": "10:00 AM", "price": 300, "booked": false, "seatId": 353, "slotId": "d64b09ae-47ea-4811-9ce2-b11400c958f2", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1434, "to": "06:00 PM", "from": "02:00 PM", "price": 300, "booked": false, "seatId": 353, "slotId": "c36ab6fd-4cf6-4e1d-9079-5cf48630dd1f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1435, "to": "10:00 PM", "from": "06:00 PM", "price": 300, "booked": false, "seatId": 353, "slotId": "ce7735e5-e839-4ae3-b688-d081eb86dca3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 1436, "to": "11:59 PM", "from": "12:00 AM", "price": 1250, "booked": false, "seatId": 353, "slotId": "17009312-58e3-4ef7-96bb-ff400034b8b3", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 12:53:28.228	2025-04-02 12:53:28.228	1	PENDING	300	600	f	1	[{"id": 1432, "to": "10:00 AM", "from": "06:00 AM", "price": 300, "booked": false, "seatId": 353, "slotId": "4f094e7e-8ea0-4d9b-93e0-3ad0b73ddf83", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 12:53:46.765	\N
358	2	43	f	{"id": 533, "roomId": 27, "seatId": "2-0", "rotation": 270, "seatName": "8", "seatLabel": "8", "timeSlots": [{"id": 2309, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 533, "slotId": "4231c0d7-31dc-4d3d-bf01-4d1ebf949cea", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2310, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 533, "slotId": "99a5dc27-8c35-4b36-a862-8946b25959ab", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2311, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 533, "slotId": "6fab16bb-a99d-4ff3-8bb7-ae87c3056707", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2312, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 533, "slotId": "2b24b0b0-0b61-4adb-95e1-39e6d96bd90b", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2313, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 533, "slotId": "584dca5d-c74e-4df9-87d7-8ec891ba1199", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 13:04:07.798	2025-04-02 13:04:07.798	1	CONFIRMED	200	0	t	1	[{"id": 2309, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 533, "slotId": "4231c0d7-31dc-4d3d-bf01-4d1ebf949cea", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 13:04:20.065	\N
359	2	3	f	{"id": 535, "roomId": 27, "seatId": "1-0", "rotation": 270, "seatName": "9", "seatLabel": "9", "timeSlots": [{"id": 2319, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 535, "slotId": "54baf5dc-546a-4c11-ab90-3cdf15a05988", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2320, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 535, "slotId": "01d10fcc-069f-47d3-886f-330665705a76", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2321, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 535, "slotId": "25748c64-5fc4-4635-b985-6adb1af93ff6", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2322, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 535, "slotId": "ed30aefa-35af-4def-b673-c5aa769f064d", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2323, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 535, "slotId": "b55b8b73-d844-4f73-9126-6f86578f7559", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 13:08:38.588	2025-04-02 13:08:38.588	1	CONFIRMED	200	0	t	1	[{"id": 2319, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 535, "slotId": "54baf5dc-546a-4c11-ab90-3cdf15a05988", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 13:08:51.348	\N
360	2	3	f	{"id": 519, "roomId": 27, "seatId": "5-2", "rotation": 90, "seatName": "16", "seatLabel": "16", "timeSlots": [{"id": 2239, "to": "10:00 AM", "from": "06:00 AM", "price": 200, "booked": false, "seatId": 519, "slotId": "60f856df-e2d6-4192-9543-a9da987ee169", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2240, "to": "02:00 PM", "from": "10:00 AM", "price": 350, "booked": false, "seatId": 519, "slotId": "64edcb42-4fb4-4964-a64a-a6232b960887", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2241, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 519, "slotId": "3635c71e-9744-489f-8cd8-5c8e2c6fe522", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2242, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 519, "slotId": "2f9b8e15-c9bf-424f-b003-a799cb1a4726", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}, {"id": 2243, "to": "11:59 PM", "from": "12:00 AM", "price": 900, "booked": false, "seatId": 519, "slotId": "3a8dd625-57ee-4d1b-a7fa-9da4a0909c9f", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]}	2025-03-02 14:05:50.073	2025-04-02 14:05:50.073	1	PENDING	200	0	f	1	[{"id": 2242, "to": "10:00 PM", "from": "06:00 PM", "price": 200, "booked": false, "seatId": 519, "slotId": "2f9b8e15-c9bf-424f-b003-a799cb1a4726", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 14:05:56.694	\N
\.


--
-- Data for Name: BookingFriend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BookingFriend" (id, "bookingId", "friendId") FROM stdin;
\.


--
-- Data for Name: Distance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Distance" (id, "libraryId", city, distance) FROM stdin;
1	3	Gaya	1.813975575890918
2	3	Jehanabad	47.57844747397269
3	3	Patna	91.25033187571523
4	3	Nawada	57.61467810516749
5	3	Bhagalpur 	206.8242175915277
6	3	Gopalganj	194.0725933086188
7	3	Motihari	206.8050868796217
8	3	Sitamarhi	207.1219138657903
9	3	Siwan	171.8030551302464
10	3	Chapra	113.0952219494417
11	3	Arrah	91.24178598333738
12	3	Buxar	133.2422932702962
13	3	Mohania	144.1613050376833
14	3	Bhabua Road	141.7264461973049
15	3	Sasaram	99.55909477010667
16	3	Aurangabad	1131.718814867142
17	3	Sheikhpura	94.80620726196837
18	3	Lakhisarai	119.4340938713166
19	3	Jamui	126.3102818892817
20	3	Banka	195.7215547633355
21	3	Katihar	272.9213589914053
22	3	Purnia	273.8466941718589
23	3	Arariya	289.6357540207771
24	3	Kishanganj	331.2532694836909
25	3	North Delhi	894.0643726925059
26	2	Gaya	1.231394649926177
27	2	Jehanabad	47.61175281370127
28	2	Patna	91.16952313694564
29	2	Nawada	56.96136446821404
30	2	Bhagalpur 	206.1805091528166
31	2	Gopalganj	194.2910765532357
32	2	Motihari	206.8629810696871
33	2	Sitamarhi	206.9857984580204
34	2	Siwan	172.0768118641103
35	2	Chapra	113.2641222603406
36	2	Arrah	91.50763628343415
37	2	Buxar	133.7728208436966
38	2	Mohania	144.8127587732264
39	2	Bhabua Road	142.3854184246057
40	2	Sasaram	100.2255808196939
41	2	Aurangabad	1132.304783718185
42	2	Sheikhpura	94.2083100272264
43	2	Lakhisarai	118.8148750619444
44	2	Jamui	125.6468960944788
45	2	Banka	195.0520665858045
46	2	Katihar	272.2944278244245
47	2	Purnia	273.2454683987618
48	2	Arariya	289.0795802717672
49	2	Kishanganj	330.6666660517542
50	2	North Delhi	894.6559237299886
51	5	Gaya	1.825755853594096
52	5	Jehanabad	47.56089844163099
53	5	Patna	91.23626204409496
54	5	Nawada	57.63031249981299
55	5	Bhagalpur 	206.8386891614205
56	5	Gopalganj	194.0502309643994
57	5	Motihari	206.7867281066229
58	5	Sitamarhi	207.1096881065431
59	5	Siwan	171.7795650397826
60	5	Chapra	113.0740060568729
61	5	Arrah	91.21846861286143
62	5	Buxar	133.2160165931081
63	5	Mohania	144.1374228058071
64	5	Bhabua Road	141.7031225379171
65	5	Sasaram	99.53658202152278
66	5	Aurangabad	1131.709413849904
67	5	Sheikhpura	94.81655896113591
68	5	Lakhisarai	119.4461911977387
69	5	Jamui	126.3273643441822
70	5	Banka	195.7398641732394
71	5	Katihar	272.9341373642042
72	5	Purnia	273.8572789667696
73	5	Arariya	289.6430945872938
74	5	Kishanganj	331.2627344142309
75	5	North Delhi	894.0385608954067
76	8	Gaya	1.836171957141179
77	8	Jehanabad	47.56955997547959
78	8	Patna	91.24609574444146
79	8	Nawada	57.63970841010499
80	8	Bhagalpur 	206.8484448107269
81	8	Gopalganj	194.056330446756
82	8	Motihari	206.7950506259457
83	8	Sitamarhi	207.1199969415507
84	8	Siwan	171.7847668666015
85	8	Chapra	113.0808634707558
86	8	Arrah	91.22382124119738
87	8	Buxar	133.2157097494866
88	8	Mohania	144.132519900921
89	8	Bhabua Road	141.6977136811696
90	8	Sasaram	99.5305319373219
91	8	Aurangabad	1131.698509250503
92	8	Sheikhpura	94.82729323957012
93	8	Lakhisarai	119.4565617532504
94	8	Jamui	126.3362512234513
95	8	Banka	195.7482566402161
96	8	Katihar	272.944346698366
97	8	Purnia	273.8679689525864
98	8	Arariya	289.6543037327049
99	8	Kishanganj	331.273628029698
100	8	North Delhi	894.0363256701665
101	11	Gaya	1.82685827488745
102	11	Jehanabad	47.56457709976138
103	11	Patna	91.23984983804083
104	11	Nawada	57.63081488378601
105	11	Bhagalpur 	206.8393882741949
106	11	Gopalganj	194.0538283303893
107	11	Motihari	206.7904137635421
108	11	Sitamarhi	207.1131955018645
109	11	Siwan	171.7830775556942
110	11	Chapra	113.0776554306596
111	11	Arrah	91.22199696866237
112	11	Buxar	133.2185925019463
113	11	Mohania	144.1387424230745
114	11	Bhabua Road	141.7042741733093
115	11	Sasaram	99.53751035886953
116	11	Aurangabad	1131.707950611295
117	11	Sheikhpura	94.8178886258212
118	11	Lakhisarai	119.4472649420214
119	11	Jamui	126.3276087872432
120	11	Banka	195.7398760024534
121	11	Katihar	272.9351070852233
122	11	Purnia	273.8585755718883
123	11	Arariya	289.6448322967332
124	11	Kishanganj	331.2641886928461
125	11	North Delhi	894.0406640804764
126	10	Gaya	1.207202264201598
127	10	Jehanabad	47.151835787539
128	10	Patna	90.74489867039146
129	10	Nawada	57.03764794562027
130	10	Bhagalpur 	206.2301327841691
131	10	Gopalganj	193.8034077383403
132	10	Motihari	206.3979235245224
133	10	Sitamarhi	206.5831600893568
134	10	Siwan	171.5880932359064
135	10	Chapra	112.7803918568703
136	10	Arrah	91.01883912465232
137	10	Buxar	133.3459367262275
138	10	Mohania	144.5146196809555
139	10	Bhabua Road	142.1063009540725
140	10	Sasaram	99.97260617456185
141	10	Aurangabad	1132.361201791681
142	10	Sheikhpura	94.17043740826213
143	10	Lakhisarai	118.8131532050428
144	10	Jamui	125.7568248237858
145	10	Banka	195.1917890615672
146	10	Katihar	272.3071898948808
147	10	Purnia	273.2125837659261
148	10	Arariya	288.9829357482927
149	10	Kishanganj	330.611322590711
150	10	North Delhi	894.273347097897
151	6	Gaya	1.832063133466161
152	6	Jehanabad	47.56507827684212
153	6	Patna	91.24123506087537
154	6	Nawada	57.63619414211941
155	6	Bhagalpur 	206.8447275443879
156	6	Gopalganj	194.0527855246879
157	6	Motihari	206.7906861155565
158	6	Sitamarhi	207.1149994497747
159	6	Siwan	171.7815718890058
160	6	Chapra	113.0770306098046
161	6	Arrah	91.22056678497742
162	6	Buxar	133.2148229919904
163	6	Mohania	144.1337424818184
164	6	Bhabua Road	141.6991799324099
165	6	Sasaram	99.5323109806867
166	6	Aurangabad	1131.702927631454
167	6	Sheikhpura	94.82298660368451
168	6	Lakhisarai	119.4524824907691
169	6	Jamui	126.3330165242181
170	6	Banka	195.7452865166954
171	6	Katihar	272.9403646053427
172	6	Purnia	273.8636907587322
173	6	Arariya	289.6496717118191
174	6	Kishanganj	331.2692169815654
175	6	North Delhi	894.0363030507607
176	14	Gaya	1.231394649926177
177	14	Jehanabad	47.61175281370127
178	14	Patna	91.16952313694564
179	14	Nawada	56.96136446821404
180	14	Bhagalpur 	206.1805091528166
181	14	Gopalganj	194.2910765532357
182	14	Motihari	206.8629810696871
183	14	Sitamarhi	206.9857984580204
184	14	Siwan	172.0768118641103
185	14	Chapra	113.2641222603406
186	14	Arrah	91.50763628343415
187	14	Buxar	133.7728208436966
188	14	Mohania	144.8127587732264
189	14	Bhabua Road	142.3854184246057
190	14	Sasaram	100.2255808196939
191	14	Aurangabad	1132.304783718185
192	14	Sheikhpura	94.2083100272264
193	14	Lakhisarai	118.8148750619444
194	14	Jamui	125.6468960944788
195	14	Banka	195.0520665858045
196	14	Katihar	272.2944278244245
197	14	Purnia	273.2454683987618
198	14	Arariya	289.0795802717672
199	14	Kishanganj	330.6666660517542
200	14	North Delhi	894.6559237299886
201	15	Gaya	1.231394649926177
202	15	Jehanabad	47.61175281370127
203	15	Patna	91.16952313694564
204	15	Nawada	56.96136446821404
205	15	Bhagalpur 	206.1805091528166
206	15	Gopalganj	194.2910765532357
207	15	Motihari	206.8629810696871
208	15	Sitamarhi	206.9857984580204
209	15	Siwan	172.0768118641103
210	15	Chapra	113.2641222603406
211	15	Arrah	91.50763628343415
212	15	Buxar	133.7728208436966
213	15	Mohania	144.8127587732264
214	15	Bhabua Road	142.3854184246057
215	15	Sasaram	100.2255808196939
216	15	Aurangabad	1132.304783718185
217	15	Sheikhpura	94.2083100272264
218	15	Lakhisarai	118.8148750619444
219	15	Jamui	125.6468960944788
220	15	Banka	195.0520665858045
221	15	Katihar	272.2944278244245
222	15	Purnia	273.2454683987618
223	15	Arariya	289.0795802717672
224	15	Kishanganj	330.6666660517542
225	15	North Delhi	894.6559237299886
226	4	Gaya	1.825731014981811
227	4	Jehanabad	47.56964385261347
228	4	Patna	91.24431956147504
229	4	Nawada	57.62871215926228
230	4	Bhagalpur 	206.8375913327776
231	4	Gopalganj	194.0595896709553
232	4	Motihari	206.7956108781776
233	4	Sitamarhi	207.1173282666004
234	4	Siwan	171.7889595578882
235	4	Chapra	113.0832721838344
236	4	Arrah	91.22786224087133
237	4	Buxar	133.2243088815683
238	4	Mohania	144.143286094463
239	4	Bhabua Road	141.7086240829242
240	4	Sasaram	99.54159211712081
241	4	Aurangabad	1131.708474045411
242	4	Sheikhpura	94.81713248522146
243	4	Lakhisarai	119.4460749896665
244	4	Jamui	126.3251170796475
245	4	Banka	195.7370457098349
246	4	Katihar	272.93374524297
247	4	Purnia	273.8577622852088
248	4	Arariya	289.6448032892307
249	4	Kishanganj	331.2636495875282
250	4	North Delhi	894.0460067508571
251	7	Gaya	1.834273371998877
252	7	Jehanabad	47.57344746829406
253	7	Patna	91.24934128944501
254	7	Nawada	57.63700477659211
255	7	Bhagalpur 	206.8459893604912
256	7	Gopalganj	194.0610660485136
257	7	Motihari	206.7990857060464
258	7	Sitamarhi	207.1228958562321
259	7	Siwan	171.7896877190447
260	7	Chapra	113.0854036815649
261	7	Arrah	91.22871412663159
262	7	Buxar	133.2209422171206
263	7	Mohania	144.1370700344944
264	7	Bhabua Road	141.7021297985232
265	7	Sasaram	99.53475768464422
266	7	Aurangabad	1131.69990122311
267	7	Sheikhpura	94.8257036242907
268	7	Lakhisarai	119.4546075569802
269	7	Jamui	126.3332359315947
270	7	Banka	195.7449744227484
271	7	Katihar	272.942249452247
272	7	Purnia	273.866330993564
273	7	Arariya	289.6533365271258
274	7	Kishanganj	331.27222270591
275	7	North Delhi	894.0413795558478
276	18	Gaya	1516.218430524338
277	18	Jehanabad	1483.416597086083
278	18	Patna	1467.099053872212
279	18	Nawada	1549.535245028224
280	18	Bhagalpur 	1635.254611787941
281	18	Gopalganj	1352.001259911851
282	18	Motihari	1375.796323664325
283	18	Sitamarhi	1427.058491556811
284	18	Siwan	1362.472160535198
285	18	Chapra	1424.379406043432
286	18	Arrah	1434.290225659373
287	18	Buxar	1382.331788889504
288	18	Mohania	1386.988993297734
289	18	Bhabua Road	1392.533926602675
290	18	Sasaram	1432.102325682465
291	18	Aurangabad	1545.66507256379
292	18	Sheikhpura	1553.577279834123
293	18	Lakhisarai	1571.996027428423
294	18	Jamui	1598.643905046562
295	18	Banka	1655.200556006218
296	18	Katihar	1660.879537955165
297	18	Purnia	1640.223098497212
298	18	Arariya	1615.033820433279
299	18	Kishanganj	1657.837767123139
300	18	North Delhi	666.4406626484351
301	17	Gaya	1516.218430524338
302	17	Jehanabad	1483.416597086083
303	17	Patna	1467.099053872212
304	17	Nawada	1549.535245028224
305	17	Bhagalpur 	1635.254611787941
306	17	Gopalganj	1352.001259911851
307	17	Motihari	1375.796323664325
308	17	Sitamarhi	1427.058491556811
309	17	Siwan	1362.472160535198
310	17	Chapra	1424.379406043432
311	17	Arrah	1434.290225659373
312	17	Buxar	1382.331788889504
313	17	Mohania	1386.988993297734
314	17	Bhabua Road	1392.533926602675
315	17	Sasaram	1432.102325682465
316	17	Aurangabad	1545.66507256379
317	17	Sheikhpura	1553.577279834123
318	17	Lakhisarai	1571.996027428423
319	17	Jamui	1598.643905046562
320	17	Banka	1655.200556006218
321	17	Katihar	1660.879537955165
322	17	Purnia	1640.223098497212
323	17	Arariya	1615.033820433279
324	17	Kishanganj	1657.837767123139
325	17	North Delhi	666.4406626484351
326	13	Gaya	1.231394649926177
327	13	Jehanabad	47.61175281370127
328	13	Patna	91.16952313694564
329	13	Nawada	56.96136446821404
330	13	Bhagalpur 	206.1805091528166
331	13	Gopalganj	194.2910765532357
332	13	Motihari	206.8629810696871
333	13	Sitamarhi	206.9857984580204
334	13	Siwan	172.0768118641103
335	13	Chapra	113.2641222603406
336	13	Arrah	91.50763628343415
337	13	Buxar	133.7728208436966
338	13	Mohania	144.8127587732264
339	13	Bhabua Road	142.3854184246057
340	13	Sasaram	100.2255808196939
341	13	Aurangabad	1132.304783718185
342	13	Sheikhpura	94.2083100272264
343	13	Lakhisarai	118.8148750619444
344	13	Jamui	125.6468960944788
345	13	Banka	195.0520665858045
346	13	Katihar	272.2944278244245
347	13	Purnia	273.2454683987618
348	13	Arariya	289.0795802717672
349	13	Kishanganj	330.6666660517542
350	13	North Delhi	894.6559237299886
351	1	Gaya	1.827886873706454
352	1	Jehanabad	47.564348632095
353	1	Patna	91.23982165455243
354	1	Nawada	57.6319366686572
355	1	Bhagalpur 	206.8404833501754
356	1	Gopalganj	194.0532721514578
357	1	Motihari	206.7901350153395
358	1	Sitamarhi	207.1132656090541
359	1	Siwan	171.7824286655021
360	1	Chapra	113.0771852201373
361	1	Arrah	91.2213630011645
362	1	Buxar	133.2175379866616
363	1	Mohania	144.1375359493879
364	1	Bhabua Road	141.7030626263218
365	1	Sasaram	99.53629645429396
366	1	Aurangabad	1131.706994246806
367	1	Sheikhpura	94.81887350982532
368	1	Lakhisarai	119.4482992472239
369	1	Jamui	126.3287604053875
370	1	Banka	195.7410495486962
371	1	Katihar	272.9361596069627
372	1	Purnia	273.8595672270719
373	1	Arariya	289.6457236448854
374	1	Kishanganj	331.2651470286061
375	1	North Delhi	894.0395244913901
\.


--
-- Data for Name: Friend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Friend" (id, name, email, relationship, "userId", "phoneNumber") FROM stdin;
\.


--
-- Data for Name: Invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Invoice" (id, "bookingId", "invoiceNumber", libraryaddress, "libraryName", "invoiceDate", "customerName", "customerEmail", "customerPhoneNumber", "libraryId", "initialPrice", "finalPrice", paid, "bookingDate", "bookingPeriod", "bookingStatus", approved, "timeStamp", "bookingFinalDate", "seatLabel", "timeSlotDetails", "createdAt") FROM stdin;
2	338	INV-338	213, A.P.Colony,, Near Abhay Simbha, Gaya, Bihar, 823001	Ekagra Library	2025-03-02 08:35:17.21	N/A	ashwin@jythu.com	9992304660	2	0	350	t	2025-03-02 08:31:11.039	1	CONFIRMED	t	\N	2025-04-02 08:31:11.039	14	"[{\\"id\\":2221,\\"to\\":\\"06:00 PM\\",\\"from\\":\\"02:00 PM\\",\\"price\\":350,\\"booked\\":false,\\"seatId\\":515,\\"slotId\\":\\"d56f66e7-6067-42ef-a419-f549e44445fe\\",\\"bookedById\\":null,\\"bookingSource\\":\\"app\\",\\"bookingEndDate\\":null}]"	2025-03-02 08:35:17.21
4	348	INV-348	213, A.P.Colony,, Near Abhay Simbha, Gaya, Bihar, 823001	Ekagra Library	2025-03-02 09:59:52.68	N/A	princeraj9826@gmail.com	7979767927	2	700	700	t	2025-03-02 09:59:25.169	1	CONFIRMED	t	\N	2025-04-02 09:59:25.169	58	"[{\\"id\\":2422,\\"to\\":\\"02:00 PM\\",\\"from\\":\\"10:00 AM\\",\\"price\\":350,\\"booked\\":false,\\"seatId\\":557,\\"slotId\\":\\"aa66f7f2-06ad-4450-8dc4-72c7856c01da\\",\\"bookedById\\":null,\\"bookingSource\\":\\"app\\",\\"bookingEndDate\\":null},{\\"id\\":2423,\\"to\\":\\"06:00 PM\\",\\"from\\":\\"02:00 PM\\",\\"price\\":350,\\"booked\\":false,\\"seatId\\":557,\\"slotId\\":\\"9c22b9a7-b134-4332-9cba-75f9a40fc9cd\\",\\"bookedById\\":null,\\"bookingSource\\":\\"app\\",\\"bookingEndDate\\":null}]"	2025-03-02 09:59:52.68
5	350	INV-350	213, A.P.Colony,, Near Abhay Simbha, Gaya, Bihar, 823001	Ekagra Library	2025-03-02 11:04:09.666	N/A	priyasneha08092001@gmail.com	7762014016	2	0	550	t	2025-03-02 11:01:21.965	1	CONFIRMED	t	\N	2025-04-02 11:01:21.965	59	"[{\\"id\\":2411,\\"to\\":\\"10:00 AM\\",\\"from\\":\\"06:00 AM\\",\\"price\\":200,\\"booked\\":false,\\"seatId\\":555,\\"slotId\\":\\"af301b9d-c747-4884-a0ea-e0ea51774812\\",\\"bookedById\\":null,\\"bookingSource\\":\\"app\\",\\"bookingEndDate\\":null},{\\"id\\":2413,\\"to\\":\\"06:00 PM\\",\\"from\\":\\"02:00 PM\\",\\"price\\":350,\\"booked\\":false,\\"seatId\\":555,\\"slotId\\":\\"f82972c9-a121-4d94-bbc4-5fbe23467375\\",\\"bookedById\\":null,\\"bookingSource\\":\\"app\\",\\"bookingEndDate\\":null}]"	2025-03-02 11:04:09.666
6	358	INV-358	213, A.P.Colony,, Near Abhay Simbha, Gaya, Bihar, 823001	Ekagra Library	2025-03-02 13:06:42.68	N/A	krrohit62056@gmail.com	6205674728	2	0	200	t	2025-03-02 13:04:07.798	1	CONFIRMED	t	\N	2025-04-02 13:04:07.798	8	"[{\\"id\\":2309,\\"to\\":\\"10:00 AM\\",\\"from\\":\\"06:00 AM\\",\\"price\\":200,\\"booked\\":false,\\"seatId\\":533,\\"slotId\\":\\"4231c0d7-31dc-4d3d-bf01-4d1ebf949cea\\",\\"bookedById\\":null,\\"bookingSource\\":\\"app\\",\\"bookingEndDate\\":null}]"	2025-03-02 13:06:42.68
7	359	INV-359	213, A.P.Colony,, Near Abhay Simbha, Gaya, Bihar, 823001	Ekagra Library	2025-03-02 13:10:07.544	N/A	amitnirala14@gmail.com	9471803877	2	0	200	t	2025-03-02 13:08:38.588	1	CONFIRMED	t	\N	2025-04-02 13:08:38.588	9	"[{\\"id\\":2319,\\"to\\":\\"10:00 AM\\",\\"from\\":\\"06:00 AM\\",\\"price\\":200,\\"booked\\":false,\\"seatId\\":535,\\"slotId\\":\\"54baf5dc-546a-4c11-ab90-3cdf15a05988\\",\\"bookedById\\":null,\\"bookingSource\\":\\"app\\",\\"bookingEndDate\\":null}]"	2025-03-02 13:10:07.544
8	340	INV-359	213, A.P.Colony,, Near Abhay Simbha, Gaya, Bihar, 823001	Ekagra Library	2025-03-02 13:10:07.544	Ravi Kumar	ravikum8202@gmail.com	8603003613	2	0	350	t	2025-03-02 17:08:38.588	1	CONFIRMED	t	\N	2025-04-02 13:08:38.588	9	[{"id": 2433, "to": "06:00 PM", "from": "02:00 PM", "price": 350, "booked": false, "seatId": 559, "slotId": "93a24fdc-3844-406b-b1b9-c6a51d7d7510", "bookedById": null, "bookingSource": "app", "bookingEndDate": null}]	2025-03-02 17:08:38.588
\.


--
-- Data for Name: Library; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Library" (id, "libraryOwnerId", name, "longDescription", "shortDescription", "cardImage", images, address, "commingSoonMessage", deleted, "comingSoon", approved, legal, "registrationFees", "cinCertificateFile", "cinNumber", "gstCertificateFile", "gstNumber", "msmeCertificateFile", "msmeNumber", "tanCertificateFile", "tanNumber", coords, "Price", "avgRating", "propertyType", "uploadElectricityBill", "uploadLeaseAgreement", "offlinePaymentPermission") FROM stdin;
3	5	Maa sharda adhyan Kendra library	Maa sharda adhyan Kendra library is one of the most Premier Library in Jehanabad	Premier Library in Jehanabad 	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870861/library-images/nn47ze8rgvynjkchh7sv.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870861/library-images/nrrcuemsenobthjushxk.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870861/library-images/a484s748kg0j1xwtoqfm.jpg}	{"city": "Jehanabad", "line1": "Near Mallahchak more", "line2": "", "state": "Bihar", "pincode": "804408"}	false	f	f	t	Sole Proprietorship	500	\N		\N		\N		\N		{24.78538476385306,84.98352877001155}	347	\N	\N	\N	\N	t
5	7	Subodh library	Subodh library is available in Gaya	In Gaya	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738168038/library-images/yjbcdmjbil73wccqg1yt.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738269148/library-images/vnpgonavapbzh6mgvyjt.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738269149/library-images/en9achwdnyxq6whxnokk.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738269148/library-images/glhurmlsxpsii6et7jjj.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738269148/library-images/zvijlxqghcftasaghy71.jpg}	{"city": "Gaya", "line1": "SBS COLONY, Narayangarh, Chandauti Rd,", "line2": "near LIC Office, Hanuman Nagar", "state": "Bihar", "pincode": "823001"}	false	f	f	t	Sole Proprietorship	0	\N		\N		\N		\N		{24.78554329190439,84.98333564461196}	250	\N	\N	\N	\N	t
16	62	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	wewewwewew	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738002800/library-images/v5kvgvvylsfe7wutt53u.png}	{"city": "Banka", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Bihar", "pincode": "234302"}	false	f	f	f	Partnership Firm	500	\N		\N		\N		https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738002804/library-images/tll1qpk9pqlnmpveuaa3.png	1w12121222	{33.6297984,73.0759168}	\N	\N	\N	\N	\N	t
1	2	Shubhkamna Library	Rest room available in our library where you can rest and discuss. Also available separate room for boys and girls.	Separate boys and girls room	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738933827/WhatsApp_Image_2025-02-06_at_22.01.12_iwqmik.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738933827/WhatsApp_Image_2025-02-06_at_22.01.10_g5dafg.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738933827/WhatsApp_Image_2025-02-06_at_22.01.08_i4b5bn.jpg}	{"city": "Gaya", "line1": "Chhotki Delha", "line2": "Tekari Road", "state": "Bihar", "pincode": "823002"}	false	f	f	t	Sole Proprietorship	0	\N		\N		\N		\N		{24.7855123,84.9833261}	1	\N	\N	\N	\N	t
14	17	Rudra Library  Cafe	Rudra Library Gaya\n	Exclusive Library In Gaya	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738916607/nukutjgqv8dk6ggga4lm.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738916607/xlemdo1qqkuxfu3dpa3b.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738916607/v150yl6t2ty9kc63vrts.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738916607/u3fa6prnj3lzbu31mqzj.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738916607/krtpzixuyltvbggqjmwp.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738916607/urcoigcaq8tvbocwgdqn.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738916607/nukutjgqv8dk6ggga4lm.jpg}	{"city": "Gaya", "line1": "Magadh Colony, Road.No.3", "line2": "A", "state": "Bihar", "pincode": "823001"}	false	f	f	t	Sole Proprietorship	0	\N		\N		\N		\N		{24.7851048,84.9901948}	300	\N	\N	\N	\N	t
11	13	HEAVEN'S LIBRARY ️	खुद के ऊपर विश्वास रखो ! फिर देखना एक दिन ऐसा आएगा घड़ी दूसरे की होगी और समय आपका। Heaven's Library	Library In North Delhi	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736938629/library-images/box6lvyhvxkea6n52udr.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736938629/library-images/bihkjqh4n7rrw9ilqqrl.jpg}	{"city": "North Delhi", "line1": "Ground Floor, 970, Gurudwara singh sabna,", "line2": "Mukherjee Nagar", "state": "Bihar", "pincode": "110009"}	false	f	f	f	Sole Proprietorship	500	\N		\N		\N		\N		{24.7855102,84.9833379}	100	\N	\N	\N	\N	t
18	70	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	2121212121212	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738006922/library-images/a3fp2insn9y6m5zg4kyw.jpg}	{"city": "Arariya", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Assam", "pincode": "234302"}	false	f	f	f	Partnership Firm	500	\N		\N		\N		\N		{33.6297984,73.0759168}	\N	\N	\N	\N	\N	t
4	6	Takshila Library	Takshila Library is located near AP COlony	Library In gaya	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/j0ssb4bztgxypwyf0pqm.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/j0ssb4bztgxypwyf0pqm.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/susduny0kvdsxn4kukwm.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/wwdajjrestbivajr6teq.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/gkfxkswpu9jpjqcbjuyj.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/lrbjl8u285vhfgljhbog.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/iq2sebbvinhrjgmbeav2.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/krcq5cj0ftttrb61kw9z.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/vajx0qnmkyltochfwypw.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736871210/library-images/e3xzjquk1zdclgsojob3.jpg}	{"city": "Gaya", "line1": "Near Maa Shanti HP GAS AGENCY", "line2": "Mustafabad, ", "state": "Bihar", "pincode": "823001"}	false	f	f	t	Sole Proprietorship	500	\N		\N		\N		\N		{24.78546451400695,84.983369272396}	300	4	\N	\N	\N	t
7	9	Vivekananda Library	 Smart Self Study Centre on Atal Path by dotP with two 4×4 high speed Wifi , Hot & Cold RO water, English & Hindi News papers, Sobject Assistance, Students Counselling , One to One Tuition & Coaching facilities, attractive rates , easy access location , seats available hurry up	A Smart Self Study Centre on Atal Path by dotP with two 4×4 high speed Wifi , Hot & Cold RO water	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875664/library-images/jfnwkr7tqieswdlhbfzw.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875661/library-images/u1vrwnw5ktcm77aa1cbi.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875662/library-images/euyagcjbwi0qdygewvig.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875662/library-images/knsmzqocohh6dlvfbq37.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875664/library-images/awidgwhazpaotgiwnisc.png}	{"city": "Patna", "line1": "3C , 3rd FlOOR , MAHESH NAGAR ROAD NO 4 SUMITRA PALACE,", "line2": "Atal Path, near SUMITRA MARRIAGE HALL", "state": "Bihar", "pincode": "800024"}	false	f	f	t	Sole Proprietorship	0	\N		\N		\N		\N		{24.7854306,84.983293}	232	\N	\N	\N	\N	t
10	12	Pustakalaya	Pustakalaya 	Library in north delhi	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736938429/library-images/tlmeggofla6miqtirahx.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736938429/library-images/wtxwymw1xcgcujtxnqdm.jpg}	{"city": "North Delhi", "line1": "Shop no 17, EDWARD lane, Block O,", "line2": "Kingsway Camp, GTB Nagar,", "state": "Tripura", "pincode": "110009"}	false	f	f	f	Sole Proprietorship	500	\N		\N		\N		\N		{24.78922806890734,84.98851574490133}	500	\N	\N	\N	\N	t
6	8	Capital Library	Capital Library is the best place to study in Patna. It is a serene and beautiful place which is perfect for students who want to study in a peaceful environment. The place is well-equipped with all the facilities that a student needs like private seating, book renting and buying services, stationeries, 100% power backup with Air Conditioner, Cold RO Water, CCTV Camera, High Speed WiFi, Noiseless Environment and Locker Facilities	Capital Library is the best place to study in Patna. It is a serene and beautiful place which is perfect for students who want to study in a peaceful environment	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875438/library-images/rg0ec4kp879eyoavv0lb.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875438/library-images/shs0wbqcflduzkorbm8g.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736875438/library-images/ekzzbowaauxgfuxll3h3.jpg}	{"city": "Patna", "line1": "S.S capital market, Ashok Rajpath Rd", "line2": "Muradpur", "state": "Bihar", "pincode": "800004"}	false	f	f	f	Sole Proprietorship	500	\N		\N		\N		\N		{24.7855059,84.9832845}	500	\N	\N	\N	\N	t
8	10	Pragya library	Pragya library The self learning point . We provide positive environment that will works for your sincere study. We are here to make your study better by providing essential items like AC room, desk light, high level book, pure cold UV RO water, air freshner, silent environment, active support team. Wishing you for your bright future. Admin team Pragya library	Pragya library The self learning point . We provide positive environment that will works for your sincere study	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736876054/library-images/dpqg6lgsl9thmxavge6d.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736876054/library-images/qmzqeahyfzz5hru6o5bi.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736876054/library-images/xzj52rjy3n3acsxuj84y.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736876055/library-images/vanyj6sbjplekfafs5nx.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736876054/library-images/ta7q0qgq1bkgxfzfjqtr.jpg}	{"city": "Gaya", "line1": "22, Bageswari Road, Near Maa Bageswari Inter College, Gaya, BH 823002 IN", "line2": "", "state": "Bihar", "pincode": "823002"}	false	f	f	f	Partnership Firm	500	\N		\N		\N		\N		{24.7854657,84.9832579}	\N	\N	\N	\N	\N	t
12	14	Delhi public Library	Library	Premier Library In north Delhi	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736946074/library-images/jgl7vhf5wqfewupommot.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736946074/library-images/myfevqrkv5gpzuvw7ouz.jpg}	{"city": "North Delhi", "line1": "Railway Station, Shyama Prasad Mukherjee Marg, opp. Old Delhi,", "line2": " Kaccha Bagh Area, Old Delhi, ", "state": "Madhya Pradesh", "pincode": "110006"}	false	f	f	f	Sole Proprietorship	500	\N		\N		\N		\N		{24.7851048,84.9901948}	100	\N	\N	\N	\N	t
13	15	Success Library	Welcome to our beautiful library, a vibrant hub of learning, exploration, and inspiration. Our library is a welcoming space where students, faculty, and community members come together to read, learn, and grow. With a wide range of resources, including books, newspaper, magzine and high speed wifi internet. We provide separate space for everyone and very peaceful environment for studying. Whether you are looking for academic resources, leisure reading materials, or simply a quiet space to study, our library has you covered. We take great pride in providing a comfortable and welcoming environment that fosters creativity, innovation, and collaboration. Come and explore our library today, and discover all that we have to offer	Library in Gaya	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738268382/c4igyls8nyboibcevho5.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738268382/qwcgl0ydylvd0cfebwue.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738268382/qyetlw11djslior4xofl.jpg}	{"city": "Gaya", "line1": "near LIC Office, New Area, Gaya, Bihar 823001", "line2": " Hanuman Nagar", "state": "Bihar", "pincode": "823001"}	false	f	f	t	Sole Proprietorship	500	\N		\N		\N		\N		{24.7851048,84.9901948}	200	4	\N	\N	\N	t
19	86	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	gg	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738063290/library-images/gqqtbdiujxi0pfle8m9v.jpg}	{"city": "Arariya", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Arunachal Pradesh", "pincode": "234302"}	false	f	f	f	Sole Proprietorship	500	\N		\N		\N		\N		{34.006413,71.4843566}	\N	\N	\N	\N	\N	t
15	18	 RUDRA LIBRARY	dddddddddddd	ggggg	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736948624/library-images/zgapjkgle2cpeehrue9s.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736948624/library-images/bnk7vw6owyvjs4ct8oo7.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736948624/library-images/rzzekyepeaukqncay2wj.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736948624/library-images/wdtcodtgaga2gifz1qb9.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736948624/library-images/jiwah50esj71dflgychv.jpg}	{"city": "Gaya", "line1": "Patna - Gaya Rd, opp. S.P Kothi, Kautilyapuri, Gewalbigha, Gaya, Bihar 823002", "line2": " Kautilyapuri, Gewalbigha, Gaya, Bihar 823002", "state": "Bihar", "pincode": "823002"}	false	f	f	f	Sole Proprietorship	500	\N		\N		\N		\N		{24.7851048,84.9901948}	\N	\N	\N	\N	\N	t
17	69	hsjhfj	sdsdsdddsdsds	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738006317/library-images/eizcf3kb0jsgrano6tot.jpg}	{"city": "Arariya", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Bihar", "pincode": "234302"}	false	f	f	f	Limited Liability Partnership (LLP)	500	\N		\N		\N		\N		{33.6297984,73.0759168}	\N	\N	\N	\N	\N	t
21	99	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	asasa	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738515295/library-images/ph0rzfjrc7efmwh0tqjs.png}	{"city": "Arrah", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Assam", "pincode": "234302"}	false	f	f	f	One Person Company (OPC)	500	\N		\N		\N		\N		{34.0063999,71.4843211}	\N	\N	\N	\N	\N	t
20	88	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	weywteywtywe	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738071400/library-images/zhejb2cwsrnlqfgtxf81.jpg}	{"city": "Aurangabad", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Bihar", "pincode": "234302"}	false	f	f	f	Partnership Firm	500	\N		\N		\N		\N		{34.0063866,71.4843256}	\N	\N	\N	\N	\N	t
22	102	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	ww	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738601168/library-images/eh8madk8ajf8mtktczwh.png,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738601171/library-images/kpk8prasemezkbyczbjl.png}	{"city": "Arrah", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Chhattisgarh", "pincode": "234302"}	false	f	f	f	Limited Liability Partnership (LLP)	500	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738601195/library-images/pjmi97cobp0awyx595is.png		https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738601190/library-images/r2qyonxnvaz9hz6sjhnt.png		https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738601203/library-images/y13ql8yhm0j6n38a8wsw.png		https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738601201/library-images/cc21bkeorhdzxkfprlyi.png		{34.0063922,71.4843279}	\N	\N	\N	\N	\N	t
23	105	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	wewwe	dhsgdhgahdghasgd	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738646332/library-images/e0dzusivohyphwnehmub.png	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738646335/library-images/kcum3zridzcmbusa6bhf.png,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738646334/library-images/fjwguevduuachrrj8ees.png}	{"city": "Aurangabad", "line1": "Lahore", "line2": "Lahore", "state": "Gujarat", "pincode": "234302"}	false	f	f	f	One Person Company (OPC)	500	\N		\N		\N		\N		{34.0057403,71.5055497}	\N	\N	\N	\N	\N	t
24	110	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	wewwe	sjfhjsdhfjdsh	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738919288/library-images/clom9xwpiec3ae7rsuwp.png}	{"city": "Aurangabad", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Assam", "pincode": "250002"}	false	f	f	f	Partnership Firm	500	\N		\N		\N		\N		{34.0057258,71.505627}	\N	\N	\N	\N	\N	t
25	111	sgdhsgdhsgddhagdhasgddhasgdhasghdgashd	wewwe	dhsgdhgahdghasgd	\N	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1738921305/library-images/cyghiwek6ysco6q6rxko.png}	{"city": "Banka", "line1": "family Mart kernal sher killi shewa adda (swabi)", "line2": "", "state": "Assam", "pincode": "234302"}	false	f	f	f	Limited Liability Partnership (LLP)	500	\N		\N		\N		\N		{34.0057235,71.5056036}	\N	\N	\N	\N	\N	t
2	4	Ekagra Library	Ekagra Library is a private library/study center. We offer students a peaceful and disturbance-free atmosphere where they can concentrate and study in silence. One of the best libraries in Gaya. must visit once... Features:- Spacious Cabins. Locker Seperate washrooms for girls & boys High-Speed WiFi. Peaceful Locality. Daily Newspapers and Monthly Magazines. Test series & Set practice. Affordable fees. availability	Premier library in Gaya	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736849341/library-images/nrumm5uoiujzclsh5pis.jpg	{https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736849341/library-images/gn73crpcnabrcp6nqbxv.jpg,https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736849341/library-images/g6c35ozwcu7rv7ka4smu.jpg}	{"city": "Gaya", "line1": "213, A.P.Colony,", "line2": "Near Abhay Simbha", "state": "Bihar", "pincode": "823001"}	false	f	f	t	Sole Proprietorship	0	\N		\N		\N		\N		{24.7851048,84.9901948}	200	5	\N	\N	\N	f
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, location, "locationImage", coords, "appId") FROM stdin;
1	Gaya	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736846825/profile-images/asoyxdzxrnkcvfkiy7yo.jpg	{24.7913957,85.0002336}	6
3	Jehanabad	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869253/profile-images/bdoykzsc9zkwoivpgtdv.png	{25.2132649,84.9853322}	6
4	Patna	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869262/profile-images/uyqygf3q6v1wmunio5vr.png	{25.5940947,85.1375645}	6
5	Nawada	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869272/profile-images/ygv48m1dn198cuqq3m0n.png	{24.8866859,85.54345719999999}	6
6	Bhagalpur 	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869278/profile-images/xhkkimahesdeeqjdnebu.png	{25.2371958,86.97457020000002}	6
8	Gopalganj	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869301/profile-images/ofcxbrij9gybdza4roy2.png	{26.4605776,84.44024619999999}	6
9	Motihari	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869314/profile-images/dkohn73bmcidqykzphnx.png	{26.6438482,84.9040337}	6
10	Sitamarhi	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869327/profile-images/btyrohpgbfe5wfs5124x.png	{26.5886976,85.5012971}	6
11	Siwan	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869331/profile-images/f4tuzlqmasa5josxs4hr.png	{26.2243204,84.3599953}	6
12	Chapra	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869337/profile-images/aossdv0crhuuzoqw0spl.png	{25.7811397,84.7543413}	6
14	Arrah	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869345/profile-images/vorn4ntoxpvvmlet3aye.png	{25.5541358,84.6664797}	6
16	Buxar	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736869368/profile-images/wtwwigfhfk1gaotktk9f.png	{25.5647103,83.9777482}	6
17	Mohania	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870067/profile-images/ce0kmsnoveakn8lnonhu.png	{25.1676631,83.61687870000002}	6
18	Bhabua Road	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870134/profile-images/i6glypmkgegzpgbtdvfn.png	{25.1019199,83.6218628}	6
19	Sasaram	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870202/profile-images/db0hpig3hpvjt1hwywmu.png	{24.9538803,84.01428659999999}	6
20	Aurangabad	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870255/profile-images/y7xfdgw37s8m4n8iqglr.jpg	{19.875754,75.3393195}	6
21	Sheikhpura	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870274/profile-images/pmtvpnbs87u9wb0wsg6d.png	{25.1391653,85.83921509999999}	6
22	Lakhisarai	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870280/profile-images/tjkrjnkcybvpdmajavaf.png	{25.1571454,86.0951592}	6
23	Jamui	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870285/profile-images/nzs67ow2vti2zsqxficx.png	{24.9255887,86.2258592}	6
24	Banka	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870290/profile-images/c9d6auzstwlyuzuvf9pf.png	{24.8874179,86.919838}	6
25	Katihar	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870298/profile-images/dvxqznezqiufumxytq33.png	{25.5540648,87.5591073}	6
26	Purnia	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870301/profile-images/xhc6eatsbcdrthwz8itp.png	{25.771665,87.47923589999999}	6
27	Arariya	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870418/profile-images/mjeyeopaxvsvzllzdnol.png	{26.1324689,87.4528067}	6
28	Kishanganj	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736870424/profile-images/jmaelv11jse6zrljzz72.png	{26.0982167,87.9450379}	6
29	North Delhi	https://res.cloudinary.com/dbnnlqq5v/image/upload/v1736937819/profile-images/inx5ebtxgjpm6etf7ppc.png	{28.7484441,77.14390999999999}	6
\.


--
-- Data for Name: Otp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Otp" (id, email, emailotp, "createdAt") FROM stdin;
\.


--
-- Data for Name: PanCardDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PanCardDetails" (id, "panNumber", "panCardFile", "adminId") FROM stdin;
2	asdasdasda	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/ashwinranjanTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29900/bhbua%20road%20%283%29%20%281%29.png	2
3	4443243233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/harshkumarsawThu%20Jan%2008%202015%2000%3A00%3A00%20GMT-0800%20%28Pacific%20Standard%20Time%29382/WhatsApp%20Image%202025-01-14%20at%2000.36.21.jpeg	3
4	546564	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/chintamanideviWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%292/Ekagra%20Academy%20%281%29.jpg	4
5	asdfasdf	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/maashardaadhyankendralibraryTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29468/Screenshot%202025-01-14%20at%206.21.01%C3%A2%C2%80%C2%AFPM.png	5
6	adsadad	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/takshilalibraryTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29584/WhatsApp%20Image%202025-01-06%20at%2012.15.09%20%281%29.jpeg	6
7	asdasd	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/subodhlibraryWed%20Jan%2001%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%2991/WhatsApp%20Image%202025-01-07%20at%2013.07.04.jpeg	7
8	asdasd	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/capitallibraryWed%20Jan%2001%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29259/Copy%20of%20Bihar%20Cities%20%282%29.png	8
9	asdasd	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/vivekanandalibraryThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29886/WhatsApp%20Image%202025-01-06%20at%2012.15.08%20%281%29.jpeg	9
10	Pragya lib	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/pragyalibraryTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29217/Copy%20of%20Bihar%20Cities%20%282%29.png	10
11	4443243233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/harshkumarsawWed%20Feb%2010%202016%2000%3A00%3A00%20GMT-0800%20%28Pacific%20Standard%20Time%29961/runhellotomcat.jpeg	11
12	asdasd	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/pustakalayaThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29727/unnamed.png	12
13	HEAVEN'S L	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/heaven%27slibrary%EF%B8%8FTue%20Jan%2007%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29422/2024-02-15.jpg	13
14	adfasdfasd	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdasdasdWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29981/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	14
15	5hyuiyuyu	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdasdasdWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29402/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	15
16	ytrytrytry	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/gfhtrhThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29281/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	16
17	eterterter	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/dyryrThu%20Jan%2009%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29745/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	17
18	kyuiyi7yi	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdasdasdFri%20Jan%2010%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29455/Colorful%20Modern%20Tuition%20Classes%20Promotion%20Instagram%20Post.png	18
19	1a122svd1	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanFri%20Jan%2017%202014%2000%3A00%3A00%20GMT%2B0500%20%28Pakistan%20Standard%20Time%29603/122A850C-06ED-47E3-A9C2-1CEE8CD18E67_1_105_c-removebg-preview.png	19
20	1A122SVD1	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%20Jan%2008%202025%2000%3A00%3A00%20GMT%2B0500%20%28Pakistan%20Standard%20Time%29155/download.jpeg	20
21	51456312	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/piuhhkbmnSat%20Jan%2018%202025%2000%3A00%3A00%20GMT%2B0530%20%28India%20Standard%20Time%29818/sad.png	21
22	2323123	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdWed%2C%2003%20Jan%202007%2009%3A11%3A42%20GMT523/verification.jpeg	22
23	1A122SVD16	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%2C%2018%20Feb%201987%2019%3A00%3A00%20GMT701/122A850C-06ED-47E3-A9C2-1CEE8CD18E67_1_105_c-removebg-preview%20Background%20Removed.jpeg	23
24	1A122SVD13	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanTue%2C%2021%20May%201991%2019%3A00%3A00%20GMT639/122A850C-06ED-47E3-A9C2-1CEE8CD18E67_1_105_c-removebg-preview%20Background%20Removed.jpeg	24
25	4524524245	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdohaisjdassdSat%2C%2020%20Jan%202007%2018%3A30%3A00%20GMT516/Screenshot%202025-01-16%20at%209.11.24%C3%A2%C2%80%C2%AFPM.png	25
26	DGST364736	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2010%20May%201987%2019%3A00%3A00%20GMT143/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60.JPG	26
27	2343EG2332	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanFri%2C%2011%20Feb%202000%2019%3A00%3A00%20GMT724/cohort%203.png	27
28	DSH2312323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT275/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60.JPG	28
29	1232332323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT573/pic1-modified.png	29
30	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT921/pic1-modified.png	30
31	SD23232232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT290/pic1-modified.png	31
32	13QDASDASD	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdaTue%2C%2030%20Apr%201991%2018%3A30%3A00%20GMT490/Snips%202.jpeg	32
33	111S1111FF	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT172/pic1-modified.png	33
34	23D3223232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT670/pic1-modified.png	34
35	H677677676	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT70/upwork%20portfolio-1.png	35
36	SD32322323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT403/pic1-modified.png	36
37	D232323232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT486/pic1-modified.png	37
38	12B2132322	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT575/pic1-modified.png	38
39	231223322E	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT216/pic1.png	39
40	231232212S	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2009%20Dec%202000%2019%3A00%3A00%20GMT905/portfolio-1%20thumb.png	40
41	ADSASDASDA	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/dasdfasdasdWed%2C%2024%20Jan%202007%2018%3A30%3A00%20GMT622/Snips%202.jpeg	41
42	13D3233334	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT140/pic3.png	42
43	1232D22323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%2C%2020%20Dec%202000%2019%3A00%3A00%20GMT219/pic4.png	43
44	D121121221	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT689/pic1.png	44
45	212121D233	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT657/upwork%20portfolio-1.png	45
46	D232321333	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT200/upwork%20portfolio-1.png	46
47	12S2223223	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT97/portfolio-1%20thumb.png	47
48	D223232332	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2011%20Nov%202000%2019%3A00%3A00%20GMT60/upwork%20portfolio-1.png	48
49	22122D2333	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT955/upwork%20portfolio-1.png	49
50	S212121221	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT918/pic4.png	50
51	12DW232323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2009%20Dec%202000%2019%3A00%3A00%20GMT698/Screenshot%202025-01-21%20at%2010.05.10%20PM.png	51
52	122222222S	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT982/Screenshot%202025-01-23%20at%2012.45.38%20PM.png	52
53	D343443434	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT95/Screenshot%202025-01-22%20at%201.05.41%20PM.png	53
54	V343434343	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT895/Screenshot%202025-01-21%20at%2010.07.02%20PM.png	54
55	AXASDASDAS	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/yuvrajtiwariFri%2C%2026%20Jan%202007%2018%3A30%3A00%20GMT792/snip%20latest1.jpeg	55
56	D223232232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT204/Screenshot%202025-01-24%20at%201.54.18%20PM.png	56
57	D223232323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT993/Screenshot%202025-01-24%20at%201.46.16%20AM.png	57
58	D221221221	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2017%20Feb%201986%2019%3A00%3A00%20GMT265/portfolio-1%20thumb.png	58
59	D223223223	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT903/portfolio-1%20thumb.png	59
60	23D4343434	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2016%20Feb%201986%2019%3A00%3A00%20GMT615/pic2.png	60
61	D332323232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT91/pic4.png	61
62	D332322322	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT714/pic2.png	62
63	VV33434343	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT589/pic3-modified.png	63
64	D343433434	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT970/pic3-modified.png	64
65	121212122S	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT792/pic1-modified.png	65
66	F343434343	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT765/upwork%20portfolio-1.png	66
67	DD23232323	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT466/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	67
68	D232323232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2024%20May%201987%2019%3A00%3A00%20GMT978/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	68
69	F323232232	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT21/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	69
70	V212121212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT497/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	70
71	V433433443	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/121212121Mon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT157/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	71
72	2312312312	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/vivekMon%2C%2006%20May%201991%2018%3A30%3A00%20GMT303/WhatsApp%20Image%202025-01-26%20at%2016.31.00.jpeg	72
73	QSWDASDASD	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdWed%2C%2020%20May%201992%2018%3A30%3A00%20GMT916/WhatsApp%20Image%202025-01-27%20at%2017.00.42.jpeg	73
74	D221212121	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT440/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	74
75	B434343434	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT551/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	75
76	67F7838473	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT844/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	76
77	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT388/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	77
78	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT816/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	78
79	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT543/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	79
80	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT825/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	80
81	D121212122	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT687/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	81
82	DGST364736	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT426/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	82
83	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT66/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	83
84	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanWed%2C%2020%20Dec%202000%2019%3A00%3A00%20GMT512/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	84
85	DGST364736	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT196/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	85
86	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT906/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	86
87	3123123123	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/asdasdTue%2C%2002%20May%201995%2018%3A30%3A00%20GMT127/WhatsApp%20Image%202025-01-27%20at%2017.00.41%20%281%29.jpeg	87
88	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanTue%2C%2011%20Jan%202000%2019%3A00%3A00%20GMT30/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	88
89	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT880/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	89
90	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT598/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	90
91	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT456/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	91
92	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT860/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	92
93	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT886/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	93
94	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT804/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	94
95	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT524/0c0b49fe-b6a3-4f7b-8d8a-1dbe107b0e60%20Small.jpeg	95
96	ADSFADSFAD	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/sucesslibraryTue%2C%2007%20May%201991%2018%3A30%3A00%20GMT778/WhatsApp%20Image%202025-01-28%20at%2022.23.25.jpeg	96
97	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT503/Screenshot%202025-02-02%20at%2011.44.05%20AM.png	97
98	DS12212212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT998/Screenshot%202025-02-02%20at%2011.44.05%20AM.png	98
99	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSat%2C%2011%20Dec%201999%2019%3A00%3A00%20GMT580/Screenshot%202025-01-31%20at%2010.26.19%20AM.png	99
100	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT595/backendDeveloper.png	100
101	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT475/backendDeveloper.png	102
102	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT822/backendDeveloper.png	103
103	232DWR3433	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT242/MERN%20STACK%20DEVELOPER.png	104
104	DGST364736	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT428/blog-app-1.png	105
105	111S111111	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT308/backendDeveloper.png	106
106	1A122SVD11	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT569/backendDeveloper.png	107
107	1A122SVD11	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT192/backendDeveloper.png	109
108	DS12212212	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanMon%2C%2011%20Dec%202000%2019%3A00%3A00%20GMT902/blog-app-5.png	110
109	D433434343	https://ekaant-docs.s3.ca-central-1.amazonaws.com/admin/muhammadzeeshanSun%2C%2010%20Dec%202000%2019%3A00%3A00%20GMT514/blog-app-2.png	111
\.


--
-- Data for Name: PhoneOtp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PhoneOtp" (id, phoneotp, "createdAt", "phoneNumber") FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "userId", review, stars, "createdAt", "libraryId") FROM stdin;
1	7	👍 library 	4	2025-01-16 16:33:05.026	4
2	7	Good library in Gaya	4	2025-02-06 09:31:19.283	13
3	42	Friendly environment, comfort zone for study 	5	2025-03-02 11:02:45.729	2
4	7	Seperate washroom for Girls and boys. Friendly environment for students 	5	2025-03-02 13:18:37.358	2
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" (id, "libraryId", "roomNo", "Ac", "doorPosition", "roomName") FROM stdin;
7	6	1	t	{0,1,0,0,0}	\N
10	11	1	t	{0,1,0,0,0}	\N
11	10	1	t	{0,1,0,0,0}	\N
12	12	1	t	{0,1,0,0,0}	\N
13	7	1	t	{0,0,1,0,0}	\N
15	6	2	t	{0,1,0,0,0}	\N
19	3	1	t	{0,0,1,0,0}	\N
20	3	2	t	{1,0,0,0,0}	\N
21	3	3	t	{1,0,0,0,0}	\N
22	4	1	t	{0,1,0,0,0}	\N
32	14	1	t	{0,0,0,1,0}	\N
27	2	1	t	{0,1,0,0,0}	\N
23	5	1	t	{0,1,0,0,0}	\N
31	13	1	t	{0,0,1,0,0}	\N
29	2	2	t	{0,0,0,0,1}	\N
33	1	1	t	{0,0,1,0,0}	\N
35	1	3	t	{0,0,0,1,0}	\N
34	1	2	t	{0,0,0,1,0}	\N
36	1	4	t	{0,1,0,0,0}	\N
\.


--
-- Data for Name: Seat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Seat" (id, "seatId", "seatLabel", "roomId", rotation, "seatName") FROM stdin;
569	0-3	42	29	0	42
558	2-8	54	29	180	54
566	0-8	37	29	0	37
562	0-10	35	29	0	35
550	2-4	50	29	180	50
554	2-6	52	29	180	52
389	2-5	45	22	180	45
388	2-4	47	22	180	47
369	3-17	24	22	90	24
338	5-4	5	22	0	5
377	2-11	34	22	180	34
360	0-9	39	22	0	39
341	5-8	9	22	0	9
374	3-8	10	22	0	10
343	5-10	13	22	0	13
390	2-3	49	22	180	49
349	3-0	55	22	630	55
355	0-4	48	22	0	48
345	5-12	17	22	0	17
381	3-13	16	22	0	16
351	1-0	53	22	270	53
348	5-15	21	22	0	21
336	5-2	3	22	0	3
362	0-11	35	22	0	35
375	3-9	12	22	0	12
387	3-3	56	22	0	56
354	0-3	50	22	0	50
60	1-3	14	7	0	14
61	1-5	16	7	0	16
62	0-4	5	7	0	5
364	0-13	32	22	0	32
347	5-14	20	22	0	20
344	5-11	15	22	0	15
537	6-0	4	27	270	4
519	5-2	16	27	90	16
522	7-3	23	27	270	23
527	9-0	12	27	630	1
538	6-3	24	27	270	24
510	0-2	11	27	90	11
535	1-0	9	27	270	9
518	5-3	25	27	270	25
526	9-2	20	27	450	20
75	1-2	8	10	0	8
76	1-3	9	10	0	9
77	1-2	8	11	0	8
78	2-1	12	11	0	12
79	3-2	18	11	0	18
80	1-1	7	12	0	7
81	1-2	8	12	0	8
82	0-1	2	13	0	2
83	0-2	3	13	0	3
84	0-3	4	13	0	4
85	1-2	7	13	0	7
86	1-1	6	13	0	6
87	2-1	10	13	0	10
88	2-2	11	13	0	11
89	2-3	12	13	0	12
90	2-0	9	13	0	9
515	3-2	14	27	450	14
529	7-0	3	27	270	3
523	8-2	19	27	450	19
511	1-2	12	27	90	12
517	4-3	26	27	270	26
528	8-0	2	27	270	2
533	2-0	8	27	270	8
534	0-0	10	27	270	10
100	0-2	3	15	270	3
101	0-1	2	15	810	2
102	1-1	5	15	90	2
103	2-1	8	15	450	8
104	1-2	6	15	270	6
105	2-2	9	15	270	9
106	3-2	12	15	270	12
107	3-1	11	15	810	11
108	4-1	14	15	90	14
109	4-2	15	15	270	15
110	5-2	18	15	270	18
111	6-2	21	15	270	21
112	7-2	24	15	270	24
113	8-2	27	15	270	27
114	9-2	30	15	270	30
115	9-1	29	15	450	29
116	8-1	26	15	90	26
117	7-1	23	15	90	23
118	6-1	20	15	90	20
119	5-1	17	15	90	17
524	8-3	22	27	270	22
536	3-3	27	27	270	27
521	7-2	18	27	810	18
530	5-0	5	27	990	5
531	4-0	6	27	270	6
509	0-3	30	27	270	30
516	4-2	15	27	90	15
512	1-3	29	27	270	29
532	3-0	7	27	270	7
525	9-3	21	27	270	21
514	2-3	28	27	270	28
513	2-2	13	27	90	13
551	3-4	61	29	0	61
559	3-8	57	29	0	57
563	0-9	36	29	0	36
570	0-2	43	29	0	43
560	2-9	55	29	180	55
568	0-4	41	29	0	41
561	3-9	56	29	0	56
571	0-1	44	29	0	44
556	2-7	53	29	180	53
546	2-2	48	29	180	48
553	3-5	60	29	0	60
339	5-5	6	22	0	6
386	2-7	42	22	180	42
382	3-14	18	22	0	18
353	0-2	51	22	0	51
340	5-7	7	22	0	7
385	2-8	40	22	180	40
384	2-9	38	22	180	38
334	5-0	1	22	0	1
378	2-12	32	22	180	32
380	2-14	28	22	180	28
342	5-9	11	22	0	11
379	2-13	30	22	180	30
346	5-13	19	22	0	19
352	0-1	52	22	0	52
337	5-3	4	22	0	4
371	1-17	26	22	450	26
370	2-17	25	22	90	25
357	0-6	44	22	0	44
373	3-7	8	22	0	8
361	0-10	37	22	0	37
383	2-10	36	22	180	36
358	0-7	43	22	0	43
363	0-12	33	22	0	33
368	4-17	23	22	810	23
367	0-16	27	22	0	27
365	0-14	31	22	0	31
366	0-15	29	22	0	29
359	0-8	41	22	0	41
372	5-17	22	22	450	22
356	0-5	46	22	0	46
376	3-10	14	22	0	14
350	2-0	54	22	270	54
335	5-1	2	22	0	2
578	0-0	1	31	0	64
579	0-1	2	31	0	63
580	0-2	3	31	0	62
581	0-3	4	31	0	61
582	0-4	5	31	0	60
583	0-5	6	31	0	59
584	0-6	7	31	0	58
585	0-7	8	31	0	57
586	0-8	9	31	0	56
587	0-10	11	31	0	54
588	0-9	10	31	0	55
589	0-11	12	31	0	53
590	0-12	13	31	0	52
591	0-13	14	31	0	51
592	0-14	15	31	0	50
593	0-16	17	31	0	48
594	0-15	16	31	0	49
595	0-17	18	31	0	47
596	0-19	20	31	0	45
236	0-9	10	19	0	10
237	0-8	9	19	180	1
238	0-7	8	19	180	2
239	0-6	7	19	180	3
240	1-6	17	19	0	14
241	1-7	18	19	0	15
242	1-8	19	19	0	16
243	1-9	20	19	0	20
244	0-3	4	19	180	5
245	0-2	3	19	180	6
246	0-1	2	19	540	7
247	1-1	12	19	0	10
248	1-2	13	19	0	11
249	1-3	14	19	0	12
250	3-3	34	19	180	34
251	3-2	33	19	180	22
252	3-1	32	19	540	23
253	4-1	42	19	0	26
254	4-2	43	19	0	27
255	4-3	44	19	0	28
256	6-2	63	19	180	38
257	6-3	64	19	180	37
258	6-1	62	19	180	39
259	7-1	72	19	0	45
260	7-2	73	19	0	44
261	7-3	74	19	0	43
262	9-1	92	19	180	48
263	9-2	93	19	180	49
264	9-3	94	19	540	50
265	10-1	102	19	0	61
266	10-2	103	19	0	60
267	10-3	104	19	0	59
268	0-5	6	19	180	4
269	0-0	1	19	180	8
270	1-0	10	19	0	9
271	3-0	28	19	180	24
272	4-0	37	19	0	25
273	6-0	55	19	540	40
274	7-0	64	19	0	46
275	1-5	15	19	0	13
276	3-5	33	19	180	20
277	3-6	34	19	180	19
278	3-7	35	19	180	18
279	3-8	36	19	180	17
280	4-5	42	19	0	29
281	4-6	43	19	0	30
282	4-7	44	19	0	31
283	4-8	45	19	0	32
284	6-5	60	19	180	36
285	6-6	61	19	180	35
286	6-7	62	19	180	34
287	6-8	63	19	540	33
288	9-0	82	19	180	47
289	10-0	91	19	0	62
290	7-6	70	19	0	41
291	9-5	87	19	180	51
292	9-6	88	19	180	52
293	9-7	89	19	180	53
294	9-8	90	19	180	54
295	10-8	99	19	0	55
296	10-7	98	19	0	56
297	10-5	96	19	0	58
298	10-6	97	19	0	57
299	7-5	69	19	360	42
300	0-0	1	20	180	94
301	0-1	2	20	180	95
302	0-3	4	20	180	97
303	0-2	3	20	180	96
304	1-0	5	20	0	90
305	1-1	6	20	0	91
306	1-2	7	20	0	92
307	1-3	8	20	0	93
308	0-0	1	21	0	163
309	0-1	2	21	0	164
310	1-2	9	21	180	186
311	1-3	10	21	180	187
312	1-4	11	21	180	188
313	1-5	12	21	180	189
314	2-2	15	21	0	182
315	2-3	16	21	0	183
316	2-4	17	21	0	184
317	2-5	18	21	0	185
318	4-2	27	21	180	178
319	4-3	28	21	180	179
320	4-4	29	21	180	180
321	4-5	30	21	180	181
322	5-2	33	21	360	174
323	5-3	34	21	0	175
324	5-4	35	21	0	176
325	5-5	36	21	0	177
326	7-2	45	21	180	170
327	7-3	46	21	180	171
328	7-4	47	21	180	172
329	7-5	48	21	180	173
330	8-5	54	21	0	169
331	8-3	52	21	0	167
332	8-4	53	21	0	168
333	8-2	51	21	0	166
597	0-20	21	31	0	44
598	0-18	19	31	0	46
599	0-21	22	31	0	43
600	2-21	66	31	180	38
601	2-20	65	31	180	39
602	2-19	64	31	180	40
603	2-18	63	31	180	41
604	2-17	62	31	180	42
605	3-17	84	31	0	28
606	3-18	85	31	0	27
607	3-19	86	31	0	26
608	3-20	87	31	0	25
609	3-21	88	31	0	24
610	5-20	131	31	180	18
611	5-19	130	31	540	19
612	5-17	128	31	180	21
613	5-18	129	31	180	20
614	2-14	59	31	180	78
615	2-12	57	31	180	76
616	2-13	58	31	540	77
617	2-11	56	31	180	75
618	2-10	55	31	180	74
619	2-9	54	31	180	73
620	2-8	53	31	180	72
621	2-7	52	31	180	71
622	2-6	51	31	180	70
623	2-5	50	31	180	69
624	2-4	49	31	180	68
625	2-3	48	31	180	67
626	2-1	46	31	180	36
627	2-0	45	31	180	37
628	3-0	67	31	0	37
629	3-1	68	31	0	36
630	3-3	70	31	0	35
631	3-4	71	31	0	34
632	5-0	111	31	0	29
633	5-1	112	31	0	30
634	5-2	113	31	0	31
635	5-3	114	31	0	32
636	5-4	115	31	0	33
637	5-16	127	31	540	22
638	5-21	132	31	180	17
639	5-15	126	31	180	23
640	16-0	6\n	32	0	6
391	0-0	1	23	180	57
392	0-1	2	23	180	58
393	0-2	3	23	180	59
394	0-3	4	23	180	60
395	1-3	16	23	0	53
396	1-1	14	23	0	55
397	1-0	13	23	0	56
398	1-2	15	23	0	54
399	0-6	7	23	180	62
400	1-6	19	23	0	51
401	0-7	8	23	180	63
402	1-7	20	23	0	50
403	0-8	9	23	180	64
404	1-8	21	23	0	49
405	0-9	10	23	180	65
406	0-10	11	23	180	66
407	0-11	12	23	180	67
408	1-9	22	23	0	48
409	1-11	24	23	0	46
410	1-10	23	23	0	47
411	0-4	5	23	180	61
412	1-4	18	23	0	52
413	0-12	13	23	180	68
414	1-12	26	23	0	45
415	3-6	46	23	180	38
416	3-7	47	23	180	39
417	3-8	48	23	180	40
418	3-9	49	23	180	41
419	3-11	51	23	180	43
420	3-10	50	23	0	42
421	3-12	52	23	180	44
422	4-12	65	23	0	21
423	4-11	64	23	0	22
424	4-10	63	23	0	23
425	4-8	61	23	0	25
426	4-6	59	23	0	27
427	4-7	60	23	0	26
428	4-9	62	23	0	24
429	4-0	53	23	0	32
430	4-1	54	23	0	31
431	4-2	55	23	0	30
432	4-3	56	23	0	29
433	3-0	40	23	180	33
434	3-1	41	23	180	34
435	3-3	43	23	180	36
436	3-4	44	23	180	37
437	3-2	42	23	180	35
438	6-0	79	23	180	11
439	7-0	92	23	0	10
440	6-1	80	23	180	12
441	6-2	81	23	180	13
442	7-2	94	23	0	9
443	6-3	82	23	180	14
444	7-3	95	23	0	8
445	6-6	85	23	180	15
446	6-7	86	23	180	16
447	7-7	99	23	0	6
448	7-8	100	23	0	5
449	6-9	88	23	180	17
450	7-9	101	23	0	4
451	6-10	89	23	180	18
452	7-10	102	23	0	3
453	6-11	90	23	180	19
454	7-11	103	23	0	2
455	6-12	91	23	180	20
456	7-12	104	23	0	1
457	7-6	98	23	0	7
458	4-4	57	23	0	28
520	6-2	17	27	90	17
679	5-3	44	32	270	44
545	3-0	65	29	0	65
549	3-2	63	29	0	63
541	0-0	45	29	0	45
565	0-7	38	29	0	38
544	3-1	64	29	0	64
557	3-7	58	29	0	58
564	0-6	39	29	0	39
548	3-3	62	29	0	62
567	0-5	40	29	0	40
542	2-0	46	29	180	46
555	3-6	59	29	0	59
552	2-5	51	29	180	51
543	2-1	47	29	180	47
547	2-3	49	29	180	49
641	16-1	5	32	0	5
642	16-2	4	32	0	4
643	16-3	3	32	0	3
644	16-4	2	32	0	2
645	16-5	1	32	0	1
646	16-7	77	32	0	77
647	16-6	79	32	0	79
648	14-0	7	32	270	7
649	13-0	8	32	270	8
650	12-0	9	32	270	9
651	11-0	10	32	270	10
652	9-0	12	32	270	12
653	0-0	21	32	270	21
654	1-0	20	32	270	20
655	2-0	19	32	270	19
656	3-0	18	32	270	18
657	5-0	16	32	270	16
658	4-0	17	32	270	17
659	6-0	15	32	270	15
660	7-0	14	32	270	14
661	8-0	13	32	270	13
662	10-0	11	32	270	11
663	0-2	22	32	810	22
664	1-2	23	32	90	23
665	2-2	24	32	450	24
666	4-2	26	32	90	26
667	5-2	27	32	450	27
668	6-2	28	32	90	28
669	7-2	29	32	90	29
670	11-2	32	32	90	32
671	12-2	33	32	90	33
672	13-2	34	32	810	34
673	14-2	35	32	90	35
674	13-3	37	32	270	37
675	12-3	38	32	270	38
676	11-3	39	32	270	39
677	7-3	42	32	270	42
678	6-3	43	32	270	43
680	4-3	45	32	270	45
681	2-3	47	32	270	47
682	3-3	46	32	270	46
683	1-3	48	32	270	48
684	0-3	49	32	270	49
685	0-5	50	32	90	50
686	1-5	51	32	450	51
687	2-5	52	32	90	52
688	3-5	53	32	90	53
689	4-5	54	32	90	54
690	5-5	55	32	90	55
691	8-5	58	32	450	58
692	7-5	57	32	450	57
693	11-5	59	32	90	59
694	13-5	61	32	90	61
695	12-5	60	32	90	60
696	14-5	62	32	90	62
697	14-6	63	32	270	63
698	13-6	64	32	270	64
699	12-6	65	32	270	65
700	8-6	67	32	270	67
701	7-6	68	32	270	68
702	6-6	69	32	270	69
703	5-6	70	32	990	70
704	4-6	71	32	270	71
705	3-6	72	32	270	72
706	2-6	73	32	270	73
707	1-6	74	32	270	74
708	0-6	75	32	270	75
709	11-6	66	32	270	66
710	14-3	36	32	270	36
711	3-2	25	32	450	25
712	9-2	30	32	450	30
713	10-2	31	32	90	31
714	10-3	40	32	270	40
715	9-3	41	32	270	41
716	6-5	56	32	90	56
717	0-1	2	33	0	2
718	0-2	3	33	0	3
719	0-3	4	33	0	4
720	0-4	5	33	360	5
721	0-5	6	33	0	6
722	0-6	7	33	0	7
723	0-7	8	33	0	8
724	0-8	9	33	0	9
725	0-9	10	33	0	10
726	0-10	11	33	0	11
727	0-11	12	33	0	12
728	0-12	13	33	0	13
740	0-0	1	33	0	1
744	2-7	19	33	0	19
743	2-0	26	33	0	26
742	2-13	15	33	180	15
741	2-10	18	33	180	18
739	2-1	25	33	0	25
738	2-2	24	33	0	24
737	2-3	23	33	360	23
736	2-4	22	33	0	22
735	2-5	21	33	0	21
734	2-6	20	33	0	20
733	2-11	17	33	180	17
732	2-12	16	33	180	16
731	2-14	15	33	0	15
730	0-14	14	33	0	14
745	0-0	40	34	270	40
746	1-0	41	34	270	41
747	3-0	43	34	270	43
748	2-0	42	34	270	42
749	3-2	39	34	810	39
750	2-2	38	34	90	38
751	0-2	36	34	90	36
752	1-2	37	34	90	37
753	0-3	35	34	630	35
754	1-3	34	34	630	34
755	2-3	33	34	270	33
756	3-3	32	34	270	32
757	0-5	31	34	90	31
758	2-5	29	34	90	29
759	1-5	30	34	90	30
760	4-5	27	34	90	27
761	3-5	28	34	90	28
771	3-5	28	34	90	28
762	0-0	49	35	270	49
763	1-0	50	35	270	50
764	3-0	52	35	270	52
765	0-2	48	35	0	48
766	1-4	46	35	90	46
767	2-4	45	35	450	45
768	3-4	44	35	90	44
769	0-4	47	35	450	47
770	2-0	51	35	270	51
772	0-0	1	36	0	1
\.


--
-- Data for Name: TimeSlot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TimeSlot" (id, "slotId", "from", "to", booked, "bookedById", "bookingSource", "bookingEndDate", "seatId", price) FROM stdin;
1337	4dbb07b0-c21b-48a2-bfa0-91fc92a41755	06:00 AM	10:00 AM	f	\N	app	\N	334	300
2532	7a6ff2d6-b905-4eea-9948-05f68b6ab3d5	06:00 AM	10:00 AM	f	\N	app	\N	578	200
2533	c8eed60e-cf13-49a4-904a-f7de6f17eb2f	10:00 AM	02:00 PM	f	\N	app	\N	578	300
2534	7c64ed70-653f-4711-83cf-0b31fc73db76	02:00 PM	06:00 PM	f	\N	app	\N	578	300
2535	5434efd7-7971-4f74-9143-428a45ec6ba4	06:00 PM	10:00 PM	f	\N	app	\N	578	200
1338	5508c1e9-c3dd-43a9-904b-fbc8fa51fef9	10:00 AM	02:00 PM	f	\N	app	\N	334	300
2536	4de5ce67-a424-4174-b610-80fa74e47703	12:00 AM	11:59 PM	f	\N	app	\N	578	1000
2538	96a9cdc2-1b22-479f-8244-522337c51132	06:00 AM	10:00 AM	f	\N	app	\N	579	200
2539	dfaded76-ec96-41e3-badc-4aa8b8ae1497	10:00 AM	02:00 PM	f	\N	app	\N	579	300
1339	ad88290d-e320-4134-af02-fa2068a2c0c2	02:00 PM	06:00 PM	f	\N	app	\N	334	300
2540	17bd35cc-1962-4498-8422-a37c17d175ac	02:00 PM	06:00 PM	f	\N	app	\N	579	300
2541	f69f3921-2977-439a-a6f1-c3e46125d7dd	06:00 PM	10:00 PM	f	\N	app	\N	579	200
2542	f04bd0b7-8631-4147-82ec-814d505f6c58	12:00 AM	11:59 PM	f	\N	app	\N	579	1000
1340	1629e40c-ac0d-4ebe-9e3d-8cba885c03d7	06:00 PM	10:00 PM	f	\N	app	\N	334	300
2544	15adf1b0-464e-4b03-8cd7-8a3461e984bf	06:00 AM	10:00 AM	f	\N	app	\N	580	200
2545	003be559-0269-4e4b-bfc2-e0de5208fe3c	10:00 AM	02:00 PM	f	\N	app	\N	580	300
2546	192488ed-9634-4801-af1b-075f1f842b8c	02:00 PM	06:00 PM	f	\N	app	\N	580	300
2547	f3ffdcff-db8f-4775-a170-33f3ea3f66de	06:00 PM	10:00 PM	f	\N	app	\N	580	200
1341	6cb528e2-2515-44d1-9c0e-91e95b6f98d1	12:00 AM	11:59 PM	f	\N	app	\N	334	1250
2548	0aaa7c87-3245-40f1-95aa-6e6f75b63e3a	12:00 AM	11:59 PM	f	\N	app	\N	580	1000
2550	05ca3a71-24c6-44fa-9063-682711576416	06:00 AM	10:00 AM	f	\N	app	\N	581	200
2551	6bc3c964-0684-4a0d-bd9c-7c9db94e6ae4	10:00 AM	02:00 PM	f	\N	app	\N	581	300
1342	266e56cb-b17e-456b-98e3-e1841cef86eb	06:00 AM	10:00 AM	f	\N	app	\N	335	300
2552	cff78a89-d682-4251-92ea-cf90856fd304	02:00 PM	06:00 PM	f	\N	app	\N	581	300
2553	2389d17d-43f6-4049-bcf3-c5ddc8cd332b	06:00 PM	10:00 PM	f	\N	app	\N	581	200
2554	c3e43a9c-2cb0-4222-a2b8-55941bea1db2	12:00 AM	11:59 PM	f	\N	app	\N	581	1000
1343	fe528114-356b-4fa4-832a-1e977bf5f0e9	10:00 AM	02:00 PM	f	\N	app	\N	335	300
2556	3640b5d9-19f5-4091-8fca-534d7c9bc9e5	06:00 AM	10:00 AM	f	\N	app	\N	582	200
2557	0e9fa3bb-cc7d-451e-aa6e-e3455326d0a0	10:00 AM	02:00 PM	f	\N	app	\N	582	300
2558	39cd1b6d-2834-40bb-8701-e2b9fdc49f83	02:00 PM	06:00 PM	f	\N	app	\N	582	300
2559	cbea627b-32c7-479d-ad7f-fc25837b2d4a	06:00 PM	10:00 PM	f	\N	app	\N	582	200
1344	3f305bc7-c526-4fbb-9906-899dda4c0948	02:00 PM	06:00 PM	f	\N	app	\N	335	300
2560	23ffaeb4-2d42-40cc-ac98-8e3a21a2f2da	12:00 AM	11:59 PM	f	\N	app	\N	582	1000
2562	fbb618e1-3848-47b0-a7f2-1ee287615f6f	06:00 AM	10:00 AM	f	\N	app	\N	583	200
2563	e2ebb4b1-6fa4-4747-b1ee-f760b7575d4c	10:00 AM	02:00 PM	f	\N	app	\N	583	300
1345	4602694e-1602-47a3-991b-fb42a68a11d2	06:00 PM	10:00 PM	f	\N	app	\N	335	300
2564	1b46531c-e066-4d55-ac85-1c5a2c75f9e0	02:00 PM	06:00 PM	f	\N	app	\N	583	300
2565	d73ebc1e-6049-48d1-a514-0804dce0c999	06:00 PM	10:00 PM	f	\N	app	\N	583	200
2566	d0ca5027-9fd1-4026-a1b2-da0d441a53c2	12:00 AM	11:59 PM	f	\N	app	\N	583	1000
1346	d0f44a64-b288-4edc-b84e-7612197b1eb9	12:00 AM	11:59 PM	f	\N	app	\N	335	1250
2568	d097a345-7e7b-4e3f-a899-8094dde98fa7	06:00 AM	10:00 AM	f	\N	app	\N	584	200
2569	aaa8dac0-fbab-430d-81f8-c98daff01bbc	10:00 AM	02:00 PM	f	\N	app	\N	584	300
2570	30a2701c-fe64-470e-be3c-402515dfd2ee	02:00 PM	06:00 PM	f	\N	app	\N	584	300
2571	7a8bce9c-07e2-4d6c-923a-b485a957ac52	06:00 PM	10:00 PM	f	\N	app	\N	584	200
1347	0c5b7855-bcdb-469d-a2de-0f76b31a76f6	06:00 AM	10:00 AM	f	\N	app	\N	336	300
2572	7ac396c7-b2b6-4b5a-b6d5-5dab8109ad1e	12:00 AM	11:59 PM	f	\N	app	\N	584	1000
2574	c1912d4b-c50b-492e-b9fd-a04aa9c1ff5f	06:00 AM	10:00 AM	f	\N	app	\N	585	200
2575	46b964b0-464b-49d9-bd34-5d2a0c597a02	10:00 AM	02:00 PM	f	\N	app	\N	585	300
1348	de7db70b-28d2-42a5-94be-d4ac1da45335	10:00 AM	02:00 PM	f	\N	app	\N	336	300
2576	55f3858b-4744-43e9-888b-0f3a176ce33e	02:00 PM	06:00 PM	f	\N	app	\N	585	300
2577	5e461337-653a-46de-aef2-eb938addff94	06:00 PM	10:00 PM	f	\N	app	\N	585	200
2578	f46ff551-2f81-4124-a508-95a6e7f83b64	12:00 AM	11:59 PM	f	\N	app	\N	585	1000
1349	0b5596fb-f54b-409f-8e98-293efda8b5d6	02:00 PM	06:00 PM	f	\N	app	\N	336	300
2580	71a6575c-bbb7-432b-8c86-46bdbc8cd63f	06:00 AM	10:00 AM	f	\N	app	\N	586	200
2581	a49c4fa4-bf1b-427d-b82e-3d6a8762f688	10:00 AM	02:00 PM	f	\N	app	\N	586	300
2582	05bd9f4a-72ec-4a9b-96f8-f7e5eedc0271	02:00 PM	06:00 PM	f	\N	app	\N	586	300
2583	7c5340a7-b7c3-4c11-806b-407816edc24c	06:00 PM	10:00 PM	f	\N	app	\N	586	200
1350	8d5ed568-0815-4054-b5d8-e766fc563d54	06:00 PM	10:00 PM	f	\N	app	\N	336	300
2584	b1defda4-e454-4b97-8b53-416f2af816b5	12:00 AM	11:59 PM	f	\N	app	\N	586	1000
2586	098e1487-2be1-426c-9b64-9344b00ef622	06:00 AM	10:00 AM	f	\N	app	\N	587	200
2587	4bdee663-0c9d-43c6-b66d-6ceb82940abb	10:00 AM	02:00 PM	f	\N	app	\N	587	300
1351	400f9c6d-9ccf-4363-8b0d-9de8f4d0b777	12:00 AM	11:59 PM	f	\N	app	\N	336	1250
2588	359bb8a3-a728-4b2c-802f-6d46854b80f2	02:00 PM	06:00 PM	f	\N	app	\N	587	300
2589	d2c0da8d-0079-4e38-990a-be50b56794b4	06:00 PM	10:00 PM	f	\N	app	\N	587	200
2590	be7459af-491a-4739-be7c-efc30fa47e68	12:00 AM	11:59 PM	f	\N	app	\N	587	1000
1352	619e9207-738b-476a-9deb-e368b6b1e215	06:00 AM	10:00 AM	f	\N	app	\N	337	300
2592	d4866528-1a06-4427-a596-e05a26d9ab9c	06:00 AM	10:00 AM	f	\N	app	\N	588	200
2593	c4d1d4b7-870e-4a31-807e-c366840ad81d	10:00 AM	02:00 PM	f	\N	app	\N	588	300
2594	ef8c5e73-32c1-4f6f-83b7-eed1db4eb7bf	02:00 PM	06:00 PM	f	\N	app	\N	588	300
2595	c5b66fee-a507-4149-a8bb-c4e17fde1990	06:00 PM	10:00 PM	f	\N	app	\N	588	200
1353	953b1b83-1455-4b90-b0cf-ef5fb905bb41	10:00 AM	02:00 PM	f	\N	app	\N	337	300
2596	3dae1604-90d4-4681-a42d-d3d2617b1637	12:00 AM	11:59 PM	f	\N	app	\N	588	1000
2598	08138515-6a15-42bd-b6ae-eff94d7fbb6c	06:00 AM	10:00 AM	f	\N	app	\N	589	200
2599	dbb8bf08-0d72-433c-b8b9-53f99d31c766	10:00 AM	02:00 PM	f	\N	app	\N	589	300
1354	45a64d20-f54c-4516-85dd-9b948b616ee0	02:00 PM	06:00 PM	f	\N	app	\N	337	300
2600	f2e07f2e-def6-46d0-9c5c-82cbb13166e4	02:00 PM	06:00 PM	f	\N	app	\N	589	300
2601	4ded7bae-1d73-4014-ae53-6b357a8bc912	06:00 PM	10:00 PM	f	\N	app	\N	589	200
2602	9ee628e6-78f4-487e-9f45-ea21e70e24ef	12:00 AM	11:59 PM	f	\N	app	\N	589	1000
1355	eecfdc1d-74da-4d34-939e-2c251e3159cf	06:00 PM	10:00 PM	f	\N	app	\N	337	300
2604	0f4096e6-96b0-4532-b2df-06b81bf793c9	06:00 AM	10:00 AM	f	\N	app	\N	590	200
2605	21c16d45-7b67-4912-bcf2-a99c1ae2b60a	10:00 AM	02:00 PM	f	\N	app	\N	590	300
2606	3f12f515-88ba-4abb-a59b-9a3707058306	02:00 PM	06:00 PM	f	\N	app	\N	590	300
2607	1dad4841-e6df-4e61-bbd1-e2b7b9b7e759	06:00 PM	10:00 PM	f	\N	app	\N	590	200
1356	5b3ee67b-e6a1-4ead-af04-fb2944fd5c4e	12:00 AM	11:59 PM	f	\N	app	\N	337	1250
2608	cbedcff1-17bd-4c85-8044-ec06fd06fd2c	12:00 AM	11:59 PM	f	\N	app	\N	590	1000
2610	03ef52fa-bcb9-406e-a6e9-5a8321616faf	06:00 AM	10:00 AM	f	\N	app	\N	591	200
2611	693eb22c-8dd3-4824-b0d8-fbecb5ca340c	10:00 AM	02:00 PM	f	\N	app	\N	591	300
1357	73f36b00-1a11-4881-bfd9-01cfe74d4d7f	06:00 AM	10:00 AM	f	\N	app	\N	338	300
2612	548a2270-d590-4b87-a174-55fdb6c42173	02:00 PM	06:00 PM	f	\N	app	\N	591	300
2613	c4413f70-96ef-452f-ad6f-01b91227b772	06:00 PM	10:00 PM	f	\N	app	\N	591	200
2614	345cba88-3fab-4da4-a833-f2f9c47d606f	12:00 AM	11:59 PM	f	\N	app	\N	591	1000
1358	aa1b551d-ac8b-4a09-8095-b08fe9074616	10:00 AM	02:00 PM	f	\N	app	\N	338	300
2616	21daa395-f679-4774-a5bf-ba9499a5460a	06:00 AM	10:00 AM	f	\N	app	\N	592	200
2617	64dfc7cc-7162-41a6-9ba8-611a480f1566	10:00 AM	02:00 PM	f	\N	app	\N	592	300
2618	795d587d-e7c0-4f0c-9068-c01fa01fdc36	02:00 PM	06:00 PM	f	\N	app	\N	592	300
2619	fe9dc292-46b7-4fd6-9129-4117efc8fe6a	06:00 PM	10:00 PM	f	\N	app	\N	592	200
1359	95a1e90d-6c2b-4bbc-8523-53fba0df047d	02:00 PM	06:00 PM	f	\N	app	\N	338	300
2620	cf67389c-b7d9-4fd4-91a1-2852ced12c0c	12:00 AM	11:59 PM	f	\N	app	\N	592	1000
2622	7d237a80-397f-4d42-ad00-63a53fd9580c	06:00 AM	10:00 AM	f	\N	app	\N	593	200
2623	b11ff15d-25ca-4146-bc6e-90f55e55703b	10:00 AM	02:00 PM	f	\N	app	\N	593	300
1360	dc61d469-b53a-4c28-90e9-597513496878	06:00 PM	10:00 PM	f	\N	app	\N	338	300
2624	bcdee50a-811b-4cad-a154-aa8bfc8976e8	02:00 PM	06:00 PM	f	\N	app	\N	593	300
2625	95ba7c8c-99ae-40f3-838d-7c540a7b3999	06:00 PM	10:00 PM	f	\N	app	\N	593	200
2626	91641215-ec9d-4368-a528-d003289b3f07	12:00 AM	11:59 PM	f	\N	app	\N	593	1000
1361	afcce8c1-9083-4390-8f81-c863d048ed8e	12:00 AM	11:59 PM	f	\N	app	\N	338	1250
2628	b0373d35-9cf9-42f8-a39c-983a3340322a	06:00 AM	10:00 AM	f	\N	app	\N	594	200
2629	ebfb7445-8375-44e5-9c5c-f614ac88f873	10:00 AM	02:00 PM	f	\N	app	\N	594	300
2630	549c62d0-3b53-4c4a-8e68-8ecf5054ddb7	02:00 PM	06:00 PM	f	\N	app	\N	594	300
2631	2d0e2da4-6044-42b1-ba9d-77bbc5a2c47f	06:00 PM	10:00 PM	f	\N	app	\N	594	200
1362	e037105e-6cb3-4c6d-9bc4-74acd85bee29	06:00 AM	10:00 AM	f	\N	app	\N	339	300
2632	de54d1b2-25e2-4b2d-b1e8-c2361e54e92f	12:00 AM	11:59 PM	f	\N	app	\N	594	1000
2634	7490b031-1368-42c3-bb18-b1ffc690dafc	06:00 AM	10:00 AM	f	\N	app	\N	595	200
2635	3b26ed81-30a9-4eda-8b1b-fa63da401ef9	10:00 AM	02:00 PM	f	\N	app	\N	595	300
1363	3bf291e1-6a3f-45a0-865b-c60162f036f3	10:00 AM	02:00 PM	f	\N	app	\N	339	300
2636	ee6f4f22-92dc-4f05-a4ad-fa695eda63db	02:00 PM	06:00 PM	f	\N	app	\N	595	300
2637	fc8eb0dd-0cd0-40ec-8299-41d9292c7d65	06:00 PM	10:00 PM	f	\N	app	\N	595	200
2638	675cb7a3-90eb-4e38-a249-54786581db96	12:00 AM	11:59 PM	f	\N	app	\N	595	1000
1364	279fd385-e9aa-494a-8b4d-d3bcd107db4c	02:00 PM	06:00 PM	f	\N	app	\N	339	300
2640	edc77227-18be-4707-9359-4da73c5add5c	06:00 AM	10:00 AM	f	\N	app	\N	596	200
2641	f3d69722-db91-44c8-908e-fefd58e462ca	10:00 AM	02:00 PM	f	\N	app	\N	596	300
2642	40196192-760c-473a-8048-8506d3473249	02:00 PM	06:00 PM	f	\N	app	\N	596	300
2643	2075640b-ca46-4d51-b77b-95d26e3c9f22	06:00 PM	10:00 PM	f	\N	app	\N	596	200
1365	0671f74b-3ff2-451c-a7cc-18eea942e4c6	06:00 PM	10:00 PM	f	\N	app	\N	339	300
2644	01559478-b060-4d9b-9918-893c3e27a584	12:00 AM	11:59 PM	f	\N	app	\N	596	1000
2646	31cfdf76-5aaa-45e4-815b-45cb248030b3	06:00 AM	10:00 AM	f	\N	app	\N	597	200
2647	4aa7f6dc-90d1-4d9a-8b1f-ca8309990f1f	10:00 AM	02:00 PM	f	\N	app	\N	597	300
1366	9b06ccb1-59d5-485b-b5d3-2c4a504eea39	12:00 AM	11:59 PM	f	\N	app	\N	339	1250
2648	eed9decf-8931-4baf-ad11-ab7af18cd9e1	02:00 PM	06:00 PM	f	\N	app	\N	597	300
2649	ee0600b0-e6be-49b4-9dc2-5c0efd4e3ae8	06:00 PM	10:00 PM	f	\N	app	\N	597	200
2650	f566520f-e704-4810-b441-aec43c91c600	12:00 AM	11:59 PM	f	\N	app	\N	597	1000
2652	c9a1b392-611a-4485-bac2-f379a0228152	06:00 AM	10:00 AM	f	\N	app	\N	598	200
2653	189b576c-1453-45d4-92c4-62a8129d8574	10:00 AM	02:00 PM	f	\N	app	\N	598	300
2654	6d8072e4-c152-4af6-99c1-3f1bda727502	02:00 PM	06:00 PM	f	\N	app	\N	598	300
2655	cd652aaa-8f50-4adb-a8b0-cd3f890a5c81	06:00 PM	10:00 PM	f	\N	app	\N	598	200
2656	a309e3f4-3c2b-45cd-af84-2cc82bbbe46c	12:00 AM	11:59 PM	f	\N	app	\N	598	1000
2658	0aa1d112-2525-4935-969e-be45b088fae8	06:00 AM	10:00 AM	f	\N	app	\N	599	200
2659	98df37fb-4cbe-4940-9c1c-6ff45cc730ce	10:00 AM	02:00 PM	f	\N	app	\N	599	300
2660	d8890de6-cb88-4209-b8b4-548e3f5a70ea	02:00 PM	06:00 PM	f	\N	app	\N	599	300
2661	5df93f3f-d2a2-4119-bec0-960d06a63e30	06:00 PM	10:00 PM	f	\N	app	\N	599	200
2662	a6d1ef26-6f4f-4e54-ad5a-2960b25b37a0	12:00 AM	11:59 PM	f	\N	app	\N	599	1000
2664	9ff2373a-1ddf-42fc-9764-da8e964508d6	06:00 AM	10:00 AM	f	\N	app	\N	600	200
2665	8b19dfb3-bbec-4dab-b45d-1a3f43ca1aee	10:00 AM	02:00 PM	f	\N	app	\N	600	300
2666	7aa05f9d-1b91-434a-be3e-9c8483fabf57	02:00 PM	06:00 PM	f	\N	app	\N	600	300
2667	3f4719c0-1c52-44e5-91c8-8a8ed2728d02	06:00 PM	10:00 PM	f	\N	app	\N	600	200
2668	579a69bb-1aad-42dd-bfa8-d25aa78113dc	12:00 AM	11:59 PM	f	\N	app	\N	600	1000
1367	c79122f4-f0bc-4038-b8d9-e3e08a907d4b	06:00 AM	10:00 AM	f	\N	app	\N	340	300
1368	8e971e84-c517-4c63-84c8-8b99f88bbbe8	10:00 AM	02:00 PM	f	\N	app	\N	340	300
1369	265e6fcc-79bb-48da-aaec-430421d79357	02:00 PM	06:00 PM	f	\N	app	\N	340	300
1370	a702a52d-ea76-4ce3-95d4-4863e619f8c3	06:00 PM	10:00 PM	f	\N	app	\N	340	300
1371	c15791b3-ee66-40c5-a8af-03d6d27a6841	12:00 AM	11:59 PM	f	\N	app	\N	340	1250
1372	c64c6535-fd94-4067-a663-da02ebb758f1	06:00 AM	10:00 AM	f	\N	app	\N	341	300
2670	d1df7d3f-7c82-430e-8058-a413a6509e56	06:00 AM	10:00 AM	f	\N	app	\N	601	200
2671	9eaa73e0-41e7-4a8e-bfc6-2cc3ed75c7a5	10:00 AM	02:00 PM	f	\N	app	\N	601	300
2672	552ae402-2250-4243-8452-b364f24afaba	02:00 PM	06:00 PM	f	\N	app	\N	601	300
180	1e6b0e2f-d0bb-40be-96f8-49fa2196c4d6	12:00 AM	11:59 PM	f	\N	app	\N	60	500
181	5616530e-eee4-4f8a-a3c6-6593311f2070	12:00 AM	11:59 PM	f	\N	app	\N	61	500
182	68f7d192-29bf-4a4e-a4c8-808bd9802fde	12:00 AM	11:59 PM	f	\N	app	\N	62	500
2673	c3cfbc04-93e1-41c3-8836-55a9d291c8dc	06:00 PM	10:00 PM	f	\N	app	\N	601	200
2674	1707e70c-5d69-42ad-9783-0ae6eeafe736	12:00 AM	11:59 PM	f	\N	app	\N	601	1000
2676	7ca3dc67-4b73-4869-bb77-e631788e4509	06:00 AM	10:00 AM	f	\N	app	\N	602	200
2677	2e17bbd2-3418-4e14-b792-f232d1523297	10:00 AM	02:00 PM	f	\N	app	\N	602	300
2678	927c3e49-ed6e-4825-ac15-88979a63a1cb	02:00 PM	06:00 PM	f	\N	app	\N	602	300
2679	e9e8b04d-038e-4ea2-84d0-44cd85f98635	06:00 PM	10:00 PM	f	\N	app	\N	602	200
2680	ea9ab7f5-f3da-4464-93d0-0eecd93d5b86	12:00 AM	11:59 PM	f	\N	app	\N	602	1000
2682	d8bc79a9-51c8-46c9-a4d5-826f4944e5c3	06:00 AM	10:00 AM	f	\N	app	\N	603	200
2683	b21667b4-ab46-4d48-8edc-cea62ad2b349	10:00 AM	02:00 PM	f	\N	app	\N	603	300
2684	4e5423c9-bae8-473b-abaf-820e03fc47e1	02:00 PM	06:00 PM	f	\N	app	\N	603	300
2685	ba34e31b-030c-4b89-b9a9-b05a4dc30537	06:00 PM	10:00 PM	f	\N	app	\N	603	200
2686	0385a7b9-10ac-4e28-9c1f-0d7fc9aa5fe4	12:00 AM	11:59 PM	f	\N	app	\N	603	1000
215	471978b9-0c42-4df0-ac15-92f4bb78349f	12:00 AM	11:59 PM	t	6	app	2025-02-23 11:06:03.298	88	232
202	6264c11e-eb07-441e-9e76-8136dfa0a143	12:00 AM	11:59 PM	f	\N	app	\N	75	100
203	7ff166f4-7ea6-4be1-ac86-7754656cd621	12:00 AM	11:59 PM	f	\N	app	\N	76	100
204	93e0d058-6805-4985-8a46-e8ff16291603	12:00 AM	11:59 PM	f	\N	app	\N	77	500
205	0b2c0b2a-7d2f-44c2-b28a-f950e60f23a0	12:00 AM	11:59 PM	f	\N	app	\N	78	500
206	29851854-0d7a-4ea2-a6aa-67f869afce7f	12:00 AM	11:59 PM	f	\N	app	\N	79	500
207	116a5280-6fbe-466a-ac68-7d6e53ca01e2	12:00 AM	11:59 PM	f	\N	app	\N	80	100
208	24b51331-f7ff-4037-a2a5-57e54529417c	12:00 AM	11:59 PM	f	\N	app	\N	81	100
210	f792623f-d4e0-4075-8164-09170d021b4b	12:00 AM	11:59 PM	f	\N	app	\N	83	232
211	8a736ae4-78f6-44e4-b635-7f33cdaa84a4	12:00 AM	11:59 PM	f	\N	app	\N	84	232
212	ed555953-ab8f-44e8-acb9-afb9feaf9bd7	12:00 AM	11:59 PM	f	\N	app	\N	85	232
213	15c7d245-c684-4ece-aadb-1bc844cc7b9c	12:00 AM	11:59 PM	f	\N	app	\N	86	232
214	94823de8-bd07-4d46-b4f8-e464bada3ff3	12:00 AM	11:59 PM	f	\N	app	\N	87	232
216	a1269f23-f953-477a-87f9-1e2c2171845e	12:00 AM	11:59 PM	f	\N	app	\N	89	232
217	4cc18d2a-f40e-4842-8e8c-952849a53e6e	12:00 AM	11:59 PM	f	\N	app	\N	90	232
209	ef04e0e4-9550-4a1b-877f-21523db19ed0	12:00 AM	11:59 PM	t	9	app	2025-02-20 01:12:32.647	82	232
227	11dc9ee9-cdae-4977-b4cb-29b5dd781d69	06:00 AM	10:00 AM	f	\N	app	\N	100	0
228	2b54afb9-02ee-401c-ba8a-874301b7fc10	12:00 AM	11:59 PM	f	\N	app	\N	100	500
229	1b8fec9c-cae8-4de0-b137-5226a2b6463c	06:00 AM	10:00 AM	f	\N	app	\N	101	0
230	a4d90eee-34eb-46af-b7a3-598a57fae04f	12:00 AM	11:59 PM	f	\N	app	\N	101	500
231	3d56a4c8-40c1-48b4-91c4-40a603dc8ed2	06:00 AM	10:00 AM	f	\N	app	\N	102	0
232	3539601a-0245-4731-9273-4c86488b8ad4	12:00 AM	11:59 PM	f	\N	app	\N	102	500
233	7f20b743-9dfb-4043-9534-b9773671d850	06:00 AM	10:00 AM	f	\N	app	\N	103	0
234	0503c882-f9fb-4898-bb98-c3637f219bbc	12:00 AM	11:59 PM	f	\N	app	\N	103	500
235	5741064f-3ca1-409a-a9f0-970f0c3f1e2a	06:00 AM	10:00 AM	f	\N	app	\N	104	0
236	760abe9a-3d53-4d85-84c1-30fbf5e27e1d	12:00 AM	11:59 PM	f	\N	app	\N	104	500
237	a55026fc-9e08-41b5-ae18-0546ead857ee	06:00 AM	10:00 AM	f	\N	app	\N	105	0
238	ed344218-3a71-429e-a6a5-58103a3e1347	12:00 AM	11:59 PM	f	\N	app	\N	105	500
239	2262634a-313c-474c-a2ea-14607273bec6	06:00 AM	10:00 AM	f	\N	app	\N	106	0
240	7481e8b3-b7ab-4841-a0ee-8287238374c9	12:00 AM	11:59 PM	f	\N	app	\N	106	500
241	b5d93b11-ad19-46d9-bc5b-6ffcc1190607	06:00 AM	10:00 AM	f	\N	app	\N	107	0
242	aa3f3d09-11ce-4857-bb1a-bd9465182add	12:00 AM	11:59 PM	f	\N	app	\N	107	500
243	04761fa8-b4b7-4bc5-bb81-e22599196c52	06:00 AM	10:00 AM	f	\N	app	\N	108	0
244	cc5f10d5-7f4c-457d-a016-9b097446aa61	12:00 AM	11:59 PM	f	\N	app	\N	108	500
245	6cbb2f97-19a6-445e-b72c-b529dac797e5	06:00 AM	10:00 AM	f	\N	app	\N	109	0
246	f9693dc3-d14d-4b9a-9f4e-ccb3f557ccec	12:00 AM	11:59 PM	f	\N	app	\N	109	500
247	b5f9ec29-2abc-4834-bdae-723c8507461c	06:00 AM	10:00 AM	f	\N	app	\N	110	0
248	e7623d5a-e779-4791-8b1a-fc88f8865bac	12:00 AM	11:59 PM	f	\N	app	\N	110	500
249	e0734a35-3e54-4389-a02f-aa2ddd70dc43	06:00 AM	10:00 AM	f	\N	app	\N	111	0
250	98619226-5095-4495-9778-0628c687f276	12:00 AM	11:59 PM	f	\N	app	\N	111	500
251	df3ed084-e272-444d-a947-1a937b72f991	06:00 AM	10:00 AM	f	\N	app	\N	112	0
252	d53f88a6-23d6-4214-9429-3c207a886fea	12:00 AM	11:59 PM	f	\N	app	\N	112	500
253	f15ecff7-f928-4b1d-8d94-a72b3b83b756	06:00 AM	10:00 AM	f	\N	app	\N	113	0
254	d9b52fc1-affd-4bd2-8911-a4ee98dba58e	12:00 AM	11:59 PM	f	\N	app	\N	113	500
255	30846ee1-528d-4af9-b166-fb57215e8be2	06:00 AM	10:00 AM	f	\N	app	\N	114	0
256	ad57f2fe-106a-489b-8546-5c95bedcf0b0	12:00 AM	11:59 PM	f	\N	app	\N	114	500
257	d0d4bbfe-bf2a-4ff9-a293-632059aa7ab4	06:00 AM	10:00 AM	f	\N	app	\N	115	0
258	f537696c-a6a8-41e5-b8d8-22e06b499291	12:00 AM	11:59 PM	f	\N	app	\N	115	500
259	a73fc9bf-d344-43df-9b1f-03b50b2b53e5	06:00 AM	10:00 AM	f	\N	app	\N	116	0
260	d8807035-fbd9-4666-84e3-801878412815	12:00 AM	11:59 PM	f	\N	app	\N	116	500
261	45f41fa2-a217-4208-aeb8-058b952a6cee	06:00 AM	10:00 AM	f	\N	app	\N	117	0
262	babe35f3-ef91-455a-bc35-6dbc07433801	12:00 AM	11:59 PM	f	\N	app	\N	117	500
263	a190e10f-58c3-4798-ba88-34a04225a176	06:00 AM	10:00 AM	f	\N	app	\N	118	0
264	2cb28f01-a723-4e78-8d2b-a4812b8d779a	12:00 AM	11:59 PM	f	\N	app	\N	118	500
265	92f6a4f4-08c6-4b77-9545-a72442a63af7	06:00 AM	10:00 AM	f	\N	app	\N	119	0
266	7f7773fc-5a0a-479d-b204-e9546552e192	12:00 AM	11:59 PM	f	\N	app	\N	119	500
2688	4a547822-642a-4585-9172-d2ecc5748f5d	06:00 AM	10:00 AM	f	\N	app	\N	604	200
2689	d1c999e9-bfab-46e1-8f6b-f485f287afea	10:00 AM	02:00 PM	f	\N	app	\N	604	300
2690	1c634248-7243-4456-94c5-a0b4599a4f48	02:00 PM	06:00 PM	f	\N	app	\N	604	300
2691	8b8a4d14-27f3-4dde-a8c1-476e86691d52	06:00 PM	10:00 PM	f	\N	app	\N	604	200
2692	04840e6f-e4aa-49a4-86f8-bf6619f78013	12:00 AM	11:59 PM	f	\N	app	\N	604	1000
2694	acdccda0-e4cd-49c5-ab05-53c3d614a7a6	06:00 AM	10:00 AM	f	\N	app	\N	605	200
2695	80960d58-8b47-4287-9008-8274170c70f9	10:00 AM	02:00 PM	f	\N	app	\N	605	300
2696	ef5721c1-e6b7-4c40-bd8e-3483c271fa35	02:00 PM	06:00 PM	f	\N	app	\N	605	300
2697	e471a8ba-f630-4017-92af-cbc632a332f6	06:00 PM	10:00 PM	f	\N	app	\N	605	200
2698	24b3e1f9-9dac-47bb-8267-3c3b63fbb3ab	12:00 AM	11:59 PM	f	\N	app	\N	605	1000
2700	dc270a22-9471-4ad6-bab3-1a4d3ac34da0	06:00 AM	10:00 AM	f	\N	app	\N	606	200
2701	12596d7a-06b6-4bd8-a880-b42a9d8c1435	10:00 AM	02:00 PM	f	\N	app	\N	606	300
2702	a84c29b1-cea8-4bd0-9df7-ee0a2863d752	02:00 PM	06:00 PM	f	\N	app	\N	606	300
2703	68c49f20-d43e-49b7-86cc-0c75a79f7b0d	06:00 PM	10:00 PM	f	\N	app	\N	606	200
2704	4380d226-92b1-4a4f-a4ea-2fb4d3a4ee44	12:00 AM	11:59 PM	f	\N	app	\N	606	1000
2706	dfd2185a-52d0-452f-8596-b1a64583f244	06:00 AM	10:00 AM	f	\N	app	\N	607	200
2707	b7684613-71cf-4f4e-ae4d-2f785098325d	10:00 AM	02:00 PM	f	\N	app	\N	607	300
2708	e23345f3-f3dc-442c-b585-c4083ef68002	02:00 PM	06:00 PM	f	\N	app	\N	607	300
2709	8153989f-2e67-4ca7-a120-80ac481e5772	06:00 PM	10:00 PM	f	\N	app	\N	607	200
2710	0ef5a56b-818e-47cd-b317-f90bd3561673	12:00 AM	11:59 PM	f	\N	app	\N	607	1000
2712	d271dcfb-9fbd-41b2-9e16-abfb9789af1a	06:00 AM	10:00 AM	f	\N	app	\N	608	200
2713	3a551de2-feb0-43b0-a231-7894bed3bbc8	10:00 AM	02:00 PM	f	\N	app	\N	608	300
2714	fcf6f749-ecdf-4d6f-9209-37d451ded452	02:00 PM	06:00 PM	f	\N	app	\N	608	300
2715	cb8169a4-9233-4655-93af-4e9ad655fe36	06:00 PM	10:00 PM	f	\N	app	\N	608	200
2716	08b94239-49d2-4f23-a700-0b601dc5bdff	12:00 AM	11:59 PM	f	\N	app	\N	608	1000
2718	133845a6-8d08-43bb-aba5-fbaa9f7dad73	06:00 AM	10:00 AM	f	\N	app	\N	609	200
2719	193b3e07-0165-4fb3-9870-472892efbce6	10:00 AM	02:00 PM	f	\N	app	\N	609	300
2720	2092703b-53d7-4925-8e62-4b9c9a13320b	02:00 PM	06:00 PM	f	\N	app	\N	609	300
2721	547a2078-99b5-48c1-885f-e721cfde508f	06:00 PM	10:00 PM	f	\N	app	\N	609	200
2722	75d11aa1-6827-44aa-9729-78fb161c62ac	12:00 AM	11:59 PM	f	\N	app	\N	609	1000
2724	45f53b1e-7872-4bee-95da-96aa92c311c6	06:00 AM	10:00 AM	f	\N	app	\N	610	200
2725	d3e2c3bf-0744-4eac-a976-e8c1266a5419	10:00 AM	02:00 PM	f	\N	app	\N	610	300
2726	d3f36135-159b-4c5b-9024-87f2c9630bbd	02:00 PM	06:00 PM	f	\N	app	\N	610	300
2727	e66cecfe-1020-4eaf-89d3-c84a22917eaf	06:00 PM	10:00 PM	f	\N	app	\N	610	200
2728	9feb17c3-e7a1-4ceb-a410-92ad19643d15	12:00 AM	11:59 PM	f	\N	app	\N	610	1000
2730	d11bbda9-979d-48ae-9c21-b144e5669f52	06:00 AM	10:00 AM	f	\N	app	\N	611	200
2731	9a9afdeb-3573-47f7-9edd-ceb16a07159d	10:00 AM	02:00 PM	f	\N	app	\N	611	300
2732	cd7c8712-b71e-48cc-8526-fe9961a6634f	02:00 PM	06:00 PM	f	\N	app	\N	611	300
2733	159f6b96-49fe-4c48-bfb6-4c859c335353	06:00 PM	10:00 PM	f	\N	app	\N	611	200
2734	51b61482-f659-45e7-b24b-8e35982dfb80	12:00 AM	11:59 PM	f	\N	app	\N	611	1000
2736	c3a36061-966e-4a34-bf5f-66aecac1466c	06:00 AM	10:00 AM	f	\N	app	\N	612	200
2737	ac6f0389-97ab-4b9a-9d7c-4cb2b7d70d43	10:00 AM	02:00 PM	f	\N	app	\N	612	300
2738	2581bb1b-6e00-4493-b2f5-9efa9b4517fc	02:00 PM	06:00 PM	f	\N	app	\N	612	300
2739	6dcd2ed9-d316-4dcc-ac62-4c9bd9843e6a	06:00 PM	10:00 PM	f	\N	app	\N	612	200
2740	1789f9d8-df95-4f01-bf22-81a46a7531bc	12:00 AM	11:59 PM	f	\N	app	\N	612	1000
2742	feed1f8e-b77c-4b7e-9903-7a47f8dd7930	06:00 AM	10:00 AM	f	\N	app	\N	613	200
2743	9563192c-7b36-4133-83c7-29b6a7a35a21	10:00 AM	02:00 PM	f	\N	app	\N	613	300
2744	2a1e8a0a-4bfd-4ea8-ba7e-806a5fdb79c9	02:00 PM	06:00 PM	f	\N	app	\N	613	300
2745	29d5f380-d1e6-4ad2-b1dd-b6508d5a7a7a	06:00 PM	10:00 PM	f	\N	app	\N	613	200
2746	a8e3e7c3-8932-44d3-b74a-1c032d274ffe	12:00 AM	11:59 PM	f	\N	app	\N	613	1000
2748	23f6ba09-9c16-4042-91f9-2037a2f55707	06:00 AM	10:00 AM	f	\N	app	\N	614	200
2749	ad47a931-4be1-4d11-a59d-f6f3be49017d	10:00 AM	02:00 PM	f	\N	app	\N	614	300
2750	8c70e054-0279-4229-ac4b-5dc782a1d88a	02:00 PM	06:00 PM	f	\N	app	\N	614	300
2751	1cd27240-6235-4122-a0fd-e680f8e994bd	06:00 PM	10:00 PM	f	\N	app	\N	614	200
2752	7120177c-784e-48e6-8b76-22ee44e5c992	12:00 AM	11:59 PM	f	\N	app	\N	614	1000
2754	fe9f6a75-2ef2-4a9d-8cf7-5dd9597ef8ec	06:00 AM	10:00 AM	f	\N	app	\N	615	200
2755	39bb9e2b-4469-4758-9a0d-adc83dc08c51	10:00 AM	02:00 PM	f	\N	app	\N	615	300
2756	c38f682b-4e04-4004-9a05-dde5fd1f085e	02:00 PM	06:00 PM	f	\N	app	\N	615	300
2757	10b016e0-2a33-4396-845e-92058cb88a84	06:00 PM	10:00 PM	f	\N	app	\N	615	200
2758	b0329868-7bd1-4f88-8827-04478c2f7caa	12:00 AM	11:59 PM	f	\N	app	\N	615	1000
2760	9ea6b006-184e-4a7a-a9f5-478e49d240ae	06:00 AM	10:00 AM	f	\N	app	\N	616	200
2761	c8cfa74c-533f-41a7-adab-48390f475d63	10:00 AM	02:00 PM	f	\N	app	\N	616	300
2762	8d31712d-2e76-4dce-8c6e-d01cf6d7a05b	02:00 PM	06:00 PM	f	\N	app	\N	616	300
2763	2516d55b-f482-4ec4-9475-cc7e7b9e0906	06:00 PM	10:00 PM	f	\N	app	\N	616	200
2764	7da4e75d-26f8-4909-ae5d-2d3630119a23	12:00 AM	11:59 PM	f	\N	app	\N	616	1000
2766	7143fda4-e85a-4a77-8824-420f20240a23	06:00 AM	10:00 AM	f	\N	app	\N	617	200
2767	5a7f6e15-0c7c-4d86-beda-9782fdd56b7c	10:00 AM	02:00 PM	f	\N	app	\N	617	300
2768	faa531e9-cda8-4d31-8208-1915556abc54	02:00 PM	06:00 PM	f	\N	app	\N	617	300
2769	cac4fc06-c6e1-4bf4-bf8e-7be5178479e8	06:00 PM	10:00 PM	f	\N	app	\N	617	200
2770	80c0922f-c476-4b52-851a-0a68581e2c43	12:00 AM	11:59 PM	f	\N	app	\N	617	1000
2772	2f6511bf-0b3d-4e90-b316-573a16e8ffc0	06:00 AM	10:00 AM	f	\N	app	\N	618	200
2773	f64cb70c-0d3c-4561-a648-d72e1e677cf8	10:00 AM	02:00 PM	f	\N	app	\N	618	300
2774	5a84929f-f80f-459d-8a86-c43dd8625c73	02:00 PM	06:00 PM	f	\N	app	\N	618	300
2775	be6f1e15-7a8f-4c68-bb1b-c5a2437cc8a3	06:00 PM	10:00 PM	f	\N	app	\N	618	200
2776	49e1698c-6085-42dc-bb67-6113be95012e	12:00 AM	11:59 PM	f	\N	app	\N	618	1000
2778	aec62afc-73bc-43b5-a12c-6c8fad416bb2	06:00 AM	10:00 AM	f	\N	app	\N	619	200
2779	d4450ef7-13d8-4ce6-a2a3-b8feec3551f9	10:00 AM	02:00 PM	f	\N	app	\N	619	300
2780	20e20d84-1f71-4e53-84f2-3c94fb4e29a1	02:00 PM	06:00 PM	f	\N	app	\N	619	300
2781	4b28b21c-a893-4be1-8e10-504fed73ceac	06:00 PM	10:00 PM	f	\N	app	\N	619	200
2782	a8f63bbc-8e01-4281-b48c-297bbaf5a3b0	12:00 AM	11:59 PM	f	\N	app	\N	619	1000
2784	bbe9bc62-1fa5-41bd-99d7-c1b940b6db72	06:00 AM	10:00 AM	f	\N	app	\N	620	200
2785	757d5fd5-8f44-4993-9c13-952194c3685a	10:00 AM	02:00 PM	f	\N	app	\N	620	300
2786	99afb364-070f-4f03-9bf2-06284b8414dd	02:00 PM	06:00 PM	f	\N	app	\N	620	300
2787	cbc71843-0842-4f53-ae33-79c1f7c739c9	06:00 PM	10:00 PM	f	\N	app	\N	620	200
2788	db0b8b33-7870-44c6-9492-bce218193f70	12:00 AM	11:59 PM	f	\N	app	\N	620	1000
2790	cb1f7f91-ee71-4f2c-bdfe-6059b036265f	06:00 AM	10:00 AM	f	\N	app	\N	621	200
2791	d7c0c6c5-0139-48e4-9dbe-17f2256bb58d	10:00 AM	02:00 PM	f	\N	app	\N	621	300
2792	74092100-bedd-4224-872b-14df4f500dfb	02:00 PM	06:00 PM	f	\N	app	\N	621	300
2793	3f86a0f2-95a8-4380-85db-342dbb0b0a23	06:00 PM	10:00 PM	f	\N	app	\N	621	200
2794	9b10879b-f174-43fe-9a16-d4a35916d024	12:00 AM	11:59 PM	f	\N	app	\N	621	1000
2796	2c93d49a-ef2b-4bf8-a3b7-3c96e9fc7937	06:00 AM	10:00 AM	f	\N	app	\N	622	200
2797	96c2b5d8-5022-457b-8093-f4acb21bd5af	10:00 AM	02:00 PM	f	\N	app	\N	622	300
2798	15480425-9e9a-44d9-8e70-5d7037327b47	02:00 PM	06:00 PM	f	\N	app	\N	622	300
2799	4955fd91-d8de-4ac6-8905-d489d8674950	06:00 PM	10:00 PM	f	\N	app	\N	622	200
2800	bcfc5118-73ea-4cca-acdc-2dd1c85aa24b	12:00 AM	11:59 PM	f	\N	app	\N	622	1000
2802	d364905d-2955-4366-a399-05579a81d35b	06:00 AM	10:00 AM	f	\N	app	\N	623	200
2803	697a3949-835a-45c7-847e-8249b156cacd	10:00 AM	02:00 PM	f	\N	app	\N	623	300
2804	db69b416-03c4-4b19-8a05-47f375a9f166	02:00 PM	06:00 PM	f	\N	app	\N	623	300
2805	137e751a-c3c3-461c-8d2a-a62235055d53	06:00 PM	10:00 PM	f	\N	app	\N	623	200
2806	c946915a-9fce-4358-a63e-4d3a9350a4da	12:00 AM	11:59 PM	f	\N	app	\N	623	1000
2808	0fd6f2ec-de9b-44e9-b48e-1ccec28e5535	06:00 AM	10:00 AM	f	\N	app	\N	624	200
2809	a2412795-f0b0-4f3b-8f84-1eb266e6c1ea	10:00 AM	02:00 PM	f	\N	app	\N	624	300
2810	2ce07a41-685a-4598-975c-f0b6ae3b94ad	02:00 PM	06:00 PM	f	\N	app	\N	624	300
1373	bce27a4e-3d58-402c-8c56-964024c81546	10:00 AM	02:00 PM	f	\N	app	\N	341	300
1374	58313077-b56a-47a7-bc29-b6c63fd5096b	02:00 PM	06:00 PM	f	\N	app	\N	341	300
1375	3e9fea59-4dee-4bb0-ab22-de4027081d31	06:00 PM	10:00 PM	f	\N	app	\N	341	300
1376	5d3d2c6e-7ffd-4a7a-b25b-092a8935116b	12:00 AM	11:59 PM	f	\N	app	\N	341	1250
1377	3248b7f4-f966-4c1f-b550-81e1aaab7008	06:00 AM	10:00 AM	f	\N	app	\N	342	300
1378	0378eb83-4328-40db-af59-929f73b0f3d5	10:00 AM	02:00 PM	f	\N	app	\N	342	300
1379	aa313f93-8eef-4d25-b596-560f6753210c	02:00 PM	06:00 PM	f	\N	app	\N	342	300
1380	dd96cb37-4909-41c8-841e-d41c6425bb95	06:00 PM	10:00 PM	f	\N	app	\N	342	300
1381	e8bfbe9c-96ab-4c10-8467-fc5103357977	12:00 AM	11:59 PM	f	\N	app	\N	342	1250
1382	29005806-e55e-4301-b423-14a305bbcd58	06:00 AM	10:00 AM	f	\N	app	\N	343	300
1383	31b89466-276d-4c80-81ff-d27855004f3f	10:00 AM	02:00 PM	f	\N	app	\N	343	300
1384	ed88dd98-d13d-4243-9f1f-457ae4165360	02:00 PM	06:00 PM	f	\N	app	\N	343	300
1385	4a20544b-1623-4872-bad2-089a8d6dc438	06:00 PM	10:00 PM	f	\N	app	\N	343	300
1386	75397e74-3c15-416b-8a58-8d35dcc4d6ee	12:00 AM	11:59 PM	f	\N	app	\N	343	1250
1387	f4c63677-19de-47a7-9656-8c1d489ee959	06:00 AM	10:00 AM	f	\N	app	\N	344	300
1388	83316583-f439-46b6-80ba-2b24a65139ee	10:00 AM	02:00 PM	f	\N	app	\N	344	300
1389	7db3f050-7b5c-45d4-8dcf-9891f7891558	02:00 PM	06:00 PM	f	\N	app	\N	344	300
1390	d01a9562-7d78-4264-bb38-279fe2fb1c91	06:00 PM	10:00 PM	f	\N	app	\N	344	300
1391	70a198f6-efad-47fa-8c6a-8fac740c43b7	12:00 AM	11:59 PM	f	\N	app	\N	344	1250
1392	d2ee1b65-8fe2-462d-ba00-692d1668e210	06:00 AM	10:00 AM	f	\N	app	\N	345	300
1393	7a70f5e6-3439-413e-898b-e7d11b631b9f	10:00 AM	02:00 PM	f	\N	app	\N	345	300
1394	9e519301-c329-46bf-af51-dfedea965b38	02:00 PM	06:00 PM	f	\N	app	\N	345	300
1395	f64f56bc-c854-4b94-b621-63005ac40891	06:00 PM	10:00 PM	f	\N	app	\N	345	300
1396	1ffe26f7-15cd-49c4-a58e-08673c22ff85	12:00 AM	11:59 PM	f	\N	app	\N	345	1250
1397	692e9092-003e-49db-9aa1-afbabc314f2d	06:00 AM	10:00 AM	f	\N	app	\N	346	300
1398	663b13b5-716f-4ad4-952d-c3ca2dba4d35	10:00 AM	02:00 PM	f	\N	app	\N	346	300
1399	8566805e-dcf1-4b87-b8f7-cea62f44fb05	02:00 PM	06:00 PM	f	\N	app	\N	346	300
1400	81a805d7-9865-4506-a2d8-82148706b019	06:00 PM	10:00 PM	f	\N	app	\N	346	300
1401	e1f1704a-426d-43c6-9f59-bf28769c2d57	12:00 AM	11:59 PM	f	\N	app	\N	346	1250
1402	8dee2541-5847-42e7-bc7e-152c3fe49b48	06:00 AM	10:00 AM	f	\N	app	\N	347	300
1403	4a571d3f-e227-408d-94e5-4c428fd872b1	10:00 AM	02:00 PM	f	\N	app	\N	347	300
1404	fe6981d3-b1e1-47e8-8252-f14111fcce06	02:00 PM	06:00 PM	f	\N	app	\N	347	300
1405	a0a62f32-c345-4675-a5a8-b38f21719072	06:00 PM	10:00 PM	f	\N	app	\N	347	300
1406	00f45a2c-4ac8-4086-9e23-a3a3f2aa9b09	12:00 AM	11:59 PM	f	\N	app	\N	347	1250
1407	8fef7841-323a-447c-8f2a-e9c431e235fb	06:00 AM	10:00 AM	f	\N	app	\N	348	300
1408	f5d62e70-f0ad-44bd-8642-ae4b3fe30f06	10:00 AM	02:00 PM	f	\N	app	\N	348	300
1409	3eedb53c-91c8-44e5-abd4-be9e552109d3	02:00 PM	06:00 PM	f	\N	app	\N	348	300
1410	87e5eae8-76bd-4b42-9d1f-d3309229338c	06:00 PM	10:00 PM	f	\N	app	\N	348	300
1411	a57db715-c1b1-4e4e-981d-9acac182e85c	12:00 AM	11:59 PM	f	\N	app	\N	348	1250
1412	a36b577b-ac51-432b-8d98-f393725e6174	06:00 AM	10:00 AM	f	\N	app	\N	349	300
1413	1f17183d-67fa-47ac-a698-9b69a72568a0	10:00 AM	02:00 PM	f	\N	app	\N	349	300
1414	713ca6fc-0fc0-4c3a-8437-31a85b1fe239	02:00 PM	06:00 PM	f	\N	app	\N	349	300
1415	672cd9ce-75b8-44d5-92e0-fcbf6afc1f2a	06:00 PM	10:00 PM	f	\N	app	\N	349	300
1416	8a8c6527-5f1b-4198-83f7-9bde4990aa90	12:00 AM	11:59 PM	f	\N	app	\N	349	1250
1417	a8f5979e-1ee1-4216-81f2-cfb73b06a94c	06:00 AM	10:00 AM	f	\N	app	\N	350	300
1418	c3428fcf-df92-49b1-a802-be545ec7046d	10:00 AM	02:00 PM	f	\N	app	\N	350	300
1419	3e2355ff-2916-4ae7-84d5-96e0841c4a75	02:00 PM	06:00 PM	f	\N	app	\N	350	300
1420	5cd03205-36ae-439b-9d17-67870b8bf5e6	06:00 PM	10:00 PM	f	\N	app	\N	350	300
1421	49a08eab-5900-4219-9f54-d856fc9243fe	12:00 AM	11:59 PM	f	\N	app	\N	350	1250
1422	92b47ca8-59ea-4d84-ba59-ceda30b0e2fa	06:00 AM	10:00 AM	f	\N	app	\N	351	300
1423	a2467747-5131-4fa5-b61c-bc10f5c70dcd	10:00 AM	02:00 PM	f	\N	app	\N	351	300
1424	0998afc0-f4e9-401d-81ec-89e7c9a0915b	02:00 PM	06:00 PM	f	\N	app	\N	351	300
1425	722f0a64-f1a4-4d72-92a4-42551fc8ad1b	06:00 PM	10:00 PM	f	\N	app	\N	351	300
1426	7ba7b282-c7b8-45a2-9dca-82750e140891	12:00 AM	11:59 PM	f	\N	app	\N	351	1250
1427	d5e4f154-6263-485b-85d5-56bca851fd4d	06:00 AM	10:00 AM	f	\N	app	\N	352	300
1428	66fb34c8-b25b-4b98-aae7-ca4590fbf171	10:00 AM	02:00 PM	f	\N	app	\N	352	300
1429	830c6869-cbbb-4f88-833f-73392e3302a1	02:00 PM	06:00 PM	f	\N	app	\N	352	300
1430	f6fe59cf-a35b-4911-942d-9353d421f544	06:00 PM	10:00 PM	f	\N	app	\N	352	300
1431	ed9d99bf-283a-4949-85c3-649eb0f90ed8	12:00 AM	11:59 PM	f	\N	app	\N	352	1250
1432	4f094e7e-8ea0-4d9b-93e0-3ad0b73ddf83	06:00 AM	10:00 AM	f	\N	app	\N	353	300
1433	d64b09ae-47ea-4811-9ce2-b11400c958f2	10:00 AM	02:00 PM	f	\N	app	\N	353	300
1434	c36ab6fd-4cf6-4e1d-9079-5cf48630dd1f	02:00 PM	06:00 PM	f	\N	app	\N	353	300
1435	ce7735e5-e839-4ae3-b688-d081eb86dca3	06:00 PM	10:00 PM	f	\N	app	\N	353	300
1436	17009312-58e3-4ef7-96bb-ff400034b8b3	12:00 AM	11:59 PM	f	\N	app	\N	353	1250
1437	26f517f5-2ffc-4f25-a2c1-d87dcb854d1c	06:00 AM	10:00 AM	f	\N	app	\N	354	300
1438	e32702f0-3176-428d-96d4-683766aa21b1	10:00 AM	02:00 PM	f	\N	app	\N	354	300
1439	2e88ebf4-6926-42af-a4c1-cac8355589c1	02:00 PM	06:00 PM	f	\N	app	\N	354	300
1440	e1ebe116-35c5-47f2-a722-cde33ea9b821	06:00 PM	10:00 PM	f	\N	app	\N	354	300
1441	42d88822-7072-4e4a-ae2a-199c59107eb8	12:00 AM	11:59 PM	f	\N	app	\N	354	1250
1442	7f0ce3fe-0f07-4735-91d3-dedd5c8f289d	06:00 AM	10:00 AM	f	\N	app	\N	355	300
1443	63a03a8b-658d-4b58-beb3-14ce74b7add5	10:00 AM	02:00 PM	f	\N	app	\N	355	300
1444	e8719c24-2714-4427-aa3b-d84cf7890fc3	02:00 PM	06:00 PM	f	\N	app	\N	355	300
1445	fcce44df-1de1-4da4-b7cf-01774aa11a6c	06:00 PM	10:00 PM	f	\N	app	\N	355	300
1446	e0c108ab-abc0-4bee-b6f9-e6eaebc4cdaa	12:00 AM	11:59 PM	f	\N	app	\N	355	1250
1447	8e364aea-90cf-4629-8a27-9a979b96d123	06:00 AM	10:00 AM	f	\N	app	\N	356	300
1448	ae3b5c39-0c23-4582-b3e9-02aabe0cb25c	10:00 AM	02:00 PM	f	\N	app	\N	356	300
1449	c99e0e57-e4a9-443c-9609-181a038863da	02:00 PM	06:00 PM	f	\N	app	\N	356	300
1450	88f6911f-eef1-46cf-85ed-39ce0aad03bc	06:00 PM	10:00 PM	f	\N	app	\N	356	300
1451	49114c53-2011-4261-adfe-29cf8210de51	12:00 AM	11:59 PM	f	\N	app	\N	356	1250
1452	6c0c2d8d-f1d6-4f1c-8c0c-aba4197d2893	06:00 AM	10:00 AM	f	\N	app	\N	357	300
1453	30e53d4b-94cc-43d5-94a9-2328af4a9234	10:00 AM	02:00 PM	f	\N	app	\N	357	300
1454	52995f4f-6037-4725-9543-bd0eeffdb0f1	02:00 PM	06:00 PM	f	\N	app	\N	357	300
1455	737aca1d-8648-4400-a8c1-0b4d0c5ca4d7	06:00 PM	10:00 PM	f	\N	app	\N	357	300
1456	3ea0f68e-8377-47d7-ba13-53e96931067c	12:00 AM	11:59 PM	f	\N	app	\N	357	1250
1457	0d7c3490-cd86-482c-81ac-008ea9969d78	06:00 AM	10:00 AM	f	\N	app	\N	358	300
1458	52b309ce-b987-41e0-ae3b-5eaad69ab9b6	10:00 AM	02:00 PM	f	\N	app	\N	358	300
1459	75efe2ca-53c5-483c-955e-705896685521	02:00 PM	06:00 PM	f	\N	app	\N	358	300
1460	1b59ff1f-5ba2-4aa6-be8d-6ead34a63675	06:00 PM	10:00 PM	f	\N	app	\N	358	300
1461	eb3b8438-de6a-44dd-af97-f6555e14efc5	12:00 AM	11:59 PM	f	\N	app	\N	358	1250
1462	d8177762-3651-47c4-9caf-58746c821a0a	06:00 AM	10:00 AM	f	\N	app	\N	359	300
1463	da01f646-3e96-4b0f-92e2-8e9abe9dcebf	10:00 AM	02:00 PM	f	\N	app	\N	359	300
1464	70b60232-e24c-4056-a889-ae70a4be3766	02:00 PM	06:00 PM	f	\N	app	\N	359	300
1465	6f2f7da1-9b42-4406-b131-6a583099f27a	06:00 PM	10:00 PM	f	\N	app	\N	359	300
1466	d47e5a8a-2ae4-4ecc-8062-790902d6b5ed	12:00 AM	11:59 PM	f	\N	app	\N	359	1250
1467	d5b61dff-e53c-4019-ba49-453854730085	06:00 AM	10:00 AM	f	\N	app	\N	360	300
1468	bd240dd5-6ac5-4675-b036-ef83180b17c3	10:00 AM	02:00 PM	f	\N	app	\N	360	300
1469	e6dcc26e-1d70-49c6-beff-ac382a3d52a4	02:00 PM	06:00 PM	f	\N	app	\N	360	300
1470	8597078f-eb51-48ee-b3a3-1054635cc3dd	06:00 PM	10:00 PM	f	\N	app	\N	360	300
1471	bee6a383-54dd-416b-ad80-46dc3c06b2d3	12:00 AM	11:59 PM	f	\N	app	\N	360	1250
1472	2255980f-7cb3-4edf-922c-8df951b21946	06:00 AM	10:00 AM	f	\N	app	\N	361	300
1473	0ce24430-93f4-42c1-b3d6-2c02809c5ef7	10:00 AM	02:00 PM	f	\N	app	\N	361	300
1474	f18c31dd-d649-40e4-93d2-28232ccba20a	02:00 PM	06:00 PM	f	\N	app	\N	361	300
1475	69f65ec6-b656-49c6-b654-d922c459750e	06:00 PM	10:00 PM	f	\N	app	\N	361	300
1476	0fd4c5e4-f28d-4903-9734-d2675b3a8556	12:00 AM	11:59 PM	f	\N	app	\N	361	1250
1477	d8f39604-7761-4226-bd61-ab8df15124d0	06:00 AM	10:00 AM	f	\N	app	\N	362	300
1478	111ce05d-80e3-4723-b3da-a2b1942c1731	10:00 AM	02:00 PM	f	\N	app	\N	362	300
1479	cdaa8fd5-171a-4cd7-9442-52477cae8bcf	02:00 PM	06:00 PM	f	\N	app	\N	362	300
1480	dd756388-d5ae-4b73-9313-de2a713bcd8f	06:00 PM	10:00 PM	f	\N	app	\N	362	300
1481	fdbaa140-b913-4fd3-90fc-f4ca37e632c2	12:00 AM	11:59 PM	f	\N	app	\N	362	1250
1482	f9932416-47e3-4db3-90f0-914a282aa6a7	06:00 AM	10:00 AM	f	\N	app	\N	363	300
1483	05c1d593-ec19-4906-9249-ad71831dea57	10:00 AM	02:00 PM	f	\N	app	\N	363	300
1484	a305fe5e-5921-4fa7-8301-e1097ac2e3c9	02:00 PM	06:00 PM	f	\N	app	\N	363	300
1485	1e7b0ff3-e0ff-45ea-83d8-b48b1dac5245	06:00 PM	10:00 PM	f	\N	app	\N	363	300
1486	6e8f250f-6e3e-4c9a-ae91-69739b1be384	12:00 AM	11:59 PM	f	\N	app	\N	363	1250
1487	11716480-f91e-47b5-9aa6-97dad10ed2c7	06:00 AM	10:00 AM	f	\N	app	\N	364	300
1488	de6a610c-e9e2-4f1f-ac40-a65d99fa1683	10:00 AM	02:00 PM	f	\N	app	\N	364	300
1489	a2819a51-efe7-440d-acb9-510a26ebca48	02:00 PM	06:00 PM	f	\N	app	\N	364	300
1490	5c9a18d2-2080-4ff7-8ae7-ccd3c421d919	06:00 PM	10:00 PM	f	\N	app	\N	364	300
1491	7e6df01c-3458-48ca-841a-5300ceafaa16	12:00 AM	11:59 PM	f	\N	app	\N	364	1250
1492	3f154c57-bc95-4419-9151-c5640c054b67	06:00 AM	10:00 AM	f	\N	app	\N	365	300
1493	ce8b8291-7dec-4b4e-bcb3-dec7c618937a	10:00 AM	02:00 PM	f	\N	app	\N	365	300
1494	c22fffb2-21f4-4336-aa4e-8b7f4aa8b106	02:00 PM	06:00 PM	f	\N	app	\N	365	300
1495	083aba15-146d-4b76-aac4-b0034287a28b	06:00 PM	10:00 PM	f	\N	app	\N	365	300
1496	b9657bb8-8d43-4bd4-97f4-e6d61d19b1f9	12:00 AM	11:59 PM	f	\N	app	\N	365	1250
1497	af60538d-c7fe-43d4-8d05-7885bdb31216	06:00 AM	10:00 AM	f	\N	app	\N	366	300
1498	d8fbbf4a-6dc2-44a1-8a54-c1d53218cb88	10:00 AM	02:00 PM	f	\N	app	\N	366	300
1499	754e5d6d-0172-4b02-a94e-1ce95e8243b4	02:00 PM	06:00 PM	f	\N	app	\N	366	300
1500	5e3d4287-8f90-474c-9901-fcbc3282147e	06:00 PM	10:00 PM	f	\N	app	\N	366	300
1501	1319a40c-63fe-471e-9426-637e40ed5b28	12:00 AM	11:59 PM	f	\N	app	\N	366	1250
1502	2c51d0d4-a204-4f3e-9c48-270a821e9d4f	06:00 AM	10:00 AM	f	\N	app	\N	367	300
1503	6b94cba8-af00-47b4-884a-b65b47a8008d	10:00 AM	02:00 PM	f	\N	app	\N	367	300
1504	a3772f84-5285-4a0a-b57d-4c0be4da236e	02:00 PM	06:00 PM	f	\N	app	\N	367	300
1505	4e6bf484-cefe-4c7d-98a7-410933a1c197	06:00 PM	10:00 PM	f	\N	app	\N	367	300
1506	e6890e7a-fb28-42c2-8a67-b1048050996f	12:00 AM	11:59 PM	f	\N	app	\N	367	1250
1507	3f0ac3f1-dd0f-43c6-b4d5-6d6f21b2d0f9	06:00 AM	10:00 AM	f	\N	app	\N	368	300
1508	e0a57b64-3ca7-4d53-8354-435099b8675d	10:00 AM	02:00 PM	f	\N	app	\N	368	300
1509	9ed0da96-a421-4193-8bc4-d78d8f255438	02:00 PM	06:00 PM	f	\N	app	\N	368	300
1510	d34c4933-dddc-4d5a-b737-cf376f8233b3	06:00 PM	10:00 PM	f	\N	app	\N	368	300
1511	af6502b6-0318-4cc9-b9b7-41178b529f25	12:00 AM	11:59 PM	f	\N	app	\N	368	1250
1512	3a4ddf4f-3dfa-496d-b397-105519031a96	06:00 AM	10:00 AM	f	\N	app	\N	369	300
1513	8ef08897-ef70-460c-a688-d71ab5765e19	10:00 AM	02:00 PM	f	\N	app	\N	369	300
1514	2b6d3661-f429-40b1-8bb9-06a326c17517	02:00 PM	06:00 PM	f	\N	app	\N	369	300
1515	f39096c8-fece-44f9-ae71-6c93f05fdae1	06:00 PM	10:00 PM	f	\N	app	\N	369	300
1516	18563494-02fa-4db7-9d54-89164a20f7e1	12:00 AM	11:59 PM	f	\N	app	\N	369	1250
1517	4fc9cabd-c1ba-487b-b576-0e34c10b4a2d	06:00 AM	10:00 AM	f	\N	app	\N	370	300
1518	312d75b2-8b5e-4015-8418-d23404bb656b	10:00 AM	02:00 PM	f	\N	app	\N	370	300
1519	240a56fd-0131-45ab-bb1e-b9969fa140dd	02:00 PM	06:00 PM	f	\N	app	\N	370	300
1520	5d6d8171-0b54-4201-a5cf-337d642f2368	06:00 PM	10:00 PM	f	\N	app	\N	370	300
1521	dc3fd879-5aa8-43e4-bcf8-11ce26909781	12:00 AM	11:59 PM	f	\N	app	\N	370	1250
1522	4413adc6-bfa0-4446-87fb-c6b29cacfa06	06:00 AM	10:00 AM	f	\N	app	\N	371	300
1523	4d806cd3-4757-4a1c-92cc-56277d8e393a	10:00 AM	02:00 PM	f	\N	app	\N	371	300
1524	0834452f-8ea9-40b4-ad9f-309845a3858a	02:00 PM	06:00 PM	f	\N	app	\N	371	300
1525	5227fc1d-e166-473a-8cf2-f33a8fc14864	06:00 PM	10:00 PM	f	\N	app	\N	371	300
1526	011be6ef-47e8-497d-a25b-1aab7dd44721	12:00 AM	11:59 PM	f	\N	app	\N	371	1250
1527	8b24ca66-8053-4536-86b2-d48dd14b619a	06:00 AM	10:00 AM	f	\N	app	\N	372	300
1528	f8b91a2e-f9b7-45b4-bbe7-27221acbbadc	10:00 AM	02:00 PM	f	\N	app	\N	372	300
1529	ffb5fb2b-b2fa-4834-90d0-716b64d5fd1b	02:00 PM	06:00 PM	f	\N	app	\N	372	300
1530	f81dfa2e-b878-4a13-b378-2efe1877599d	06:00 PM	10:00 PM	f	\N	app	\N	372	300
1531	4f117bd8-52a6-4c7f-a801-02b213a50041	12:00 AM	11:59 PM	f	\N	app	\N	372	1250
1532	2abcbe45-f7f3-4127-8a7a-966f80d5b9c4	06:00 AM	10:00 AM	f	\N	app	\N	373	300
1533	648959cf-f360-4688-8c2c-a9c06ac7a39f	10:00 AM	02:00 PM	f	\N	app	\N	373	300
1534	31f5c949-34e7-4466-bebf-5460f9b21e07	02:00 PM	06:00 PM	f	\N	app	\N	373	300
1535	fed371de-8568-4e89-8b89-58670a52bf00	06:00 PM	10:00 PM	f	\N	app	\N	373	300
1536	e976ca74-e590-49ab-8fcf-957c077b8263	12:00 AM	11:59 PM	f	\N	app	\N	373	1250
1537	cae6cafa-0be0-442f-b3f1-c84f98881589	06:00 AM	10:00 AM	f	\N	app	\N	374	300
1538	59b6cbd1-ac3c-4030-944c-7ca53d03b6b2	10:00 AM	02:00 PM	f	\N	app	\N	374	300
1539	76911fc5-294d-4751-89ce-4f1042fc4886	02:00 PM	06:00 PM	f	\N	app	\N	374	300
1540	68c4f738-3f9e-4b15-bba8-565b36b8872e	06:00 PM	10:00 PM	f	\N	app	\N	374	300
1541	fb8c03d5-cbcd-45ec-9e3e-2eeff30b87ff	12:00 AM	11:59 PM	f	\N	app	\N	374	1250
1542	1548e41f-695e-4b34-8385-b445de1e3a71	06:00 AM	10:00 AM	f	\N	app	\N	375	300
1543	835983c4-a28b-4ed9-9608-9ab6f6e5acd6	10:00 AM	02:00 PM	f	\N	app	\N	375	300
1544	d2a357a3-db65-45a0-9f23-956275f2b73b	02:00 PM	06:00 PM	f	\N	app	\N	375	300
1545	a927bcb6-8658-4775-b976-9a648ef10f83	06:00 PM	10:00 PM	f	\N	app	\N	375	300
1546	1c59c2d9-45a4-4aab-aa52-ef4b462231ec	12:00 AM	11:59 PM	f	\N	app	\N	375	1250
1547	2bb34807-7399-4686-8274-f7c0644d3d0a	06:00 AM	10:00 AM	f	\N	app	\N	376	300
1548	7da88ff9-ab4f-4d19-b719-8ff7dd312c3e	10:00 AM	02:00 PM	f	\N	app	\N	376	300
1549	46395c81-a2a1-48b2-9c0e-27cb2025b479	02:00 PM	06:00 PM	f	\N	app	\N	376	300
1550	f8410f14-3ea0-449c-a220-256a2d9f1ad8	06:00 PM	10:00 PM	f	\N	app	\N	376	300
1551	b42c7b93-1cef-4954-b0c5-319fa2bee65d	12:00 AM	11:59 PM	f	\N	app	\N	376	1250
1552	3c1236c8-c5fe-48f3-a917-b053edce9117	06:00 AM	10:00 AM	f	\N	app	\N	377	300
1553	eaad8e3a-bf66-4d5f-b916-ed85532a904e	10:00 AM	02:00 PM	f	\N	app	\N	377	300
1554	68de25cd-0e62-4b5d-b84e-631fb69adfc8	02:00 PM	06:00 PM	f	\N	app	\N	377	300
1555	6cfa9d1b-db40-426f-8a24-26ba3a4a4df9	06:00 PM	10:00 PM	f	\N	app	\N	377	300
1556	4ce6f05a-07d3-46da-a217-0a0d046009c0	12:00 AM	11:59 PM	f	\N	app	\N	377	1250
1557	7516d145-fc23-452b-a090-bf0048a9d3fd	06:00 AM	10:00 AM	f	\N	app	\N	378	300
1558	f8b6f6b3-1342-4c48-b818-62b9c2d1a057	10:00 AM	02:00 PM	f	\N	app	\N	378	300
1559	7269049e-6974-4d67-b6a4-f5db8216eb9e	02:00 PM	06:00 PM	f	\N	app	\N	378	300
1560	1d278f40-acb6-48a0-bdcd-b3175268f5b6	06:00 PM	10:00 PM	f	\N	app	\N	378	300
1561	874936f2-7b08-4f6f-a49d-6810562a580c	12:00 AM	11:59 PM	f	\N	app	\N	378	1250
1562	a823e091-4364-4e24-93dd-a9b929f281e2	06:00 AM	10:00 AM	f	\N	app	\N	379	300
1563	d6b3684f-27d4-4111-bd65-f3c6fbfd7bea	10:00 AM	02:00 PM	f	\N	app	\N	379	300
1564	851c8053-0997-44fb-92a4-9983855279d3	02:00 PM	06:00 PM	f	\N	app	\N	379	300
1565	60c0d1a6-22cd-4825-ae29-2d5f14f6c28a	06:00 PM	10:00 PM	f	\N	app	\N	379	300
1566	3688b119-58b0-4456-a0bd-b681c87a088f	12:00 AM	11:59 PM	f	\N	app	\N	379	1250
1567	69a09ce5-2114-4e61-b235-8029f9b43a93	06:00 AM	10:00 AM	f	\N	app	\N	380	300
1568	1c3892f8-73c0-43c6-aac9-96f95ce4fa9e	10:00 AM	02:00 PM	f	\N	app	\N	380	300
1569	d3513c33-7e4c-462f-9c09-958c85818a56	02:00 PM	06:00 PM	f	\N	app	\N	380	300
1570	19848594-b7f8-4fd4-a504-f43860b96a86	06:00 PM	10:00 PM	f	\N	app	\N	380	300
1571	8cfaf7a9-bb59-4638-b62a-222b1c426763	12:00 AM	11:59 PM	f	\N	app	\N	380	1250
1572	7b64da26-95d5-483d-afd9-8f947642ae72	06:00 AM	10:00 AM	f	\N	app	\N	381	300
1573	9ff3b9cc-424f-4e8c-9af7-b22e658029d0	10:00 AM	02:00 PM	f	\N	app	\N	381	300
1574	07d36e0b-e9c1-47d0-af3a-d32022fc35f6	02:00 PM	06:00 PM	f	\N	app	\N	381	300
1575	b50aae24-2d0a-40aa-8aa1-800f11f99648	06:00 PM	10:00 PM	f	\N	app	\N	381	300
1576	f010efac-3805-4adf-a9be-e285fdf9b637	12:00 AM	11:59 PM	f	\N	app	\N	381	1250
1577	3a0b0b40-7a6e-46b4-b2bf-ec8a677f7ab2	06:00 AM	10:00 AM	f	\N	app	\N	382	300
1578	fdd6439b-62f1-49d9-b917-2cbeba33a9c2	10:00 AM	02:00 PM	f	\N	app	\N	382	300
1579	7732fb73-5ee5-4efc-824e-768d77bf8b4d	02:00 PM	06:00 PM	f	\N	app	\N	382	300
1580	0d8bf6cd-0d5a-4a44-9940-2ab78d04e3a3	06:00 PM	10:00 PM	f	\N	app	\N	382	300
1581	12c5bddf-b9e9-447f-9643-fd002d79a238	12:00 AM	11:59 PM	f	\N	app	\N	382	1250
1582	3f5365b5-7d29-4460-b632-27dd835bc362	06:00 AM	10:00 AM	f	\N	app	\N	383	300
1583	44a6e92a-9bf1-42f1-8464-de9ec8b1b0c6	10:00 AM	02:00 PM	f	\N	app	\N	383	300
1584	6785d549-bf01-47b7-a597-58fc44bc1c61	02:00 PM	06:00 PM	f	\N	app	\N	383	300
1585	7e1fa740-59c2-4da5-bde8-388f3bb67b08	06:00 PM	10:00 PM	f	\N	app	\N	383	300
1586	2f57f135-2a1f-4c73-9541-28ad68daf30a	12:00 AM	11:59 PM	f	\N	app	\N	383	1250
1587	6d699885-aa39-4ca1-b43e-de75c4fb6363	06:00 AM	10:00 AM	f	\N	app	\N	384	300
1588	40efcc3e-5705-44bf-84e4-5093308b0915	10:00 AM	02:00 PM	f	\N	app	\N	384	300
1589	57effd7c-784d-4945-9356-e02c2a05ff01	02:00 PM	06:00 PM	f	\N	app	\N	384	300
1590	6b09f681-bfc4-4ec6-a26e-919d23e7b500	06:00 PM	10:00 PM	f	\N	app	\N	384	300
1591	dd982b4c-10c5-41e4-81be-deed0874b970	12:00 AM	11:59 PM	f	\N	app	\N	384	1250
1592	3c64b06d-30d9-40a1-8e6d-504bc8e558c9	06:00 AM	10:00 AM	f	\N	app	\N	385	300
1593	104edeea-0657-4901-b2f9-ff69c590de78	10:00 AM	02:00 PM	f	\N	app	\N	385	300
1594	c9dee39a-19fe-4b9f-9df0-adc8f00f0c1b	02:00 PM	06:00 PM	f	\N	app	\N	385	300
1595	e5e3f107-00d9-4f12-8443-e327b4b2fa2e	06:00 PM	10:00 PM	f	\N	app	\N	385	300
1596	a09bcd09-84a1-4082-b41e-97e19cb7b2e1	12:00 AM	11:59 PM	f	\N	app	\N	385	1250
1597	5ed29c04-3758-4bf7-9e95-71d6003a0a63	06:00 AM	10:00 AM	f	\N	app	\N	386	300
1598	49328714-8a93-4c13-8c3d-895f0506cbff	10:00 AM	02:00 PM	f	\N	app	\N	386	300
1599	db23eb45-d04f-4039-af93-aadf8f02bb12	02:00 PM	06:00 PM	f	\N	app	\N	386	300
1600	fa22b6f2-bf69-4633-914d-7e41494dbfa5	06:00 PM	10:00 PM	f	\N	app	\N	386	300
1601	c475851e-2cdb-4036-aae4-4bf3959fdee8	12:00 AM	11:59 PM	f	\N	app	\N	386	1250
1602	9c9bfdd9-ceb5-4763-8bce-f4f71d81005e	06:00 AM	10:00 AM	f	\N	app	\N	387	300
1603	0798c75e-b03b-4c26-b850-e087fb4397f1	10:00 AM	02:00 PM	f	\N	app	\N	387	300
1604	7d5a73a2-7da2-4c05-bcbd-548697e1e15e	02:00 PM	06:00 PM	f	\N	app	\N	387	300
1605	f82d78e6-c9e8-4a68-8712-52c528828b68	06:00 PM	10:00 PM	f	\N	app	\N	387	300
1606	0552626d-19d2-4844-84b0-736090a8770b	12:00 AM	11:59 PM	f	\N	app	\N	387	1250
1607	53d91a14-eebe-420a-90a1-6f7c7e9bac59	06:00 AM	10:00 AM	f	\N	app	\N	388	300
1608	f00ef176-82bd-4b59-9070-3e0b2244ed90	10:00 AM	02:00 PM	f	\N	app	\N	388	300
1609	613eaae8-9028-4d3a-82bb-ff7c9a720c3c	02:00 PM	06:00 PM	f	\N	app	\N	388	300
1610	f59c7048-fba4-4b9a-8292-bd7d8c2d56c4	06:00 PM	10:00 PM	f	\N	app	\N	388	300
1611	b93cc99b-c280-4925-8a1b-47be83b75cfe	12:00 AM	11:59 PM	f	\N	app	\N	388	1250
1612	5137e4cc-bff1-44f9-aff9-a4febd92ac50	06:00 AM	10:00 AM	f	\N	app	\N	389	300
1613	87d50e33-1e0f-467e-b5f4-e447651679be	10:00 AM	02:00 PM	f	\N	app	\N	389	300
1614	1d89d4b2-e148-47c3-a877-59146824325a	02:00 PM	06:00 PM	f	\N	app	\N	389	300
1615	d83cc443-0c5a-44f3-9392-7612f569e3f3	06:00 PM	10:00 PM	f	\N	app	\N	389	300
1616	3529f3d4-3722-4cdf-befe-58af524a4287	12:00 AM	11:59 PM	f	\N	app	\N	389	1250
1617	e8ff43d7-4a2c-414b-a669-11590deee336	06:00 AM	10:00 AM	f	\N	app	\N	390	300
1618	292c3301-94f7-4164-bbff-a32d8c860a76	10:00 AM	02:00 PM	f	\N	app	\N	390	300
1619	216b4056-32e8-4736-ba00-dca6e0a333a6	02:00 PM	06:00 PM	f	\N	app	\N	390	300
1620	a2327ca6-9b0a-4b91-be60-1945153f40ce	06:00 PM	10:00 PM	f	\N	app	\N	390	300
1621	ab1aa4a8-054d-47eb-b36f-c65222928428	12:00 AM	11:59 PM	f	\N	app	\N	390	1250
1650	04ccf3c3-8655-4388-96b2-3c25e37d5a27	06:00 PM	10:00 PM	f	\N	app	\N	396	250
1651	2cdfada1-ce9a-48c4-bc36-a6300453766d	12:00 AM	11:59 PM	f	\N	app	\N	396	800
1652	f14a6397-3172-40eb-aa3d-54981d5f82b0	06:00 AM	10:00 AM	f	\N	app	\N	397	250
1653	324ab0cd-524c-43bd-b604-2cb8d3151bdb	10:00 AM	02:00 PM	f	\N	app	\N	397	300
1654	53f5539f-ab1c-46c2-bac4-7a419f308c75	02:00 PM	06:00 PM	f	\N	app	\N	397	300
1655	97fbacf5-5ff0-4e74-964a-0d773dfca47c	06:00 PM	10:00 PM	f	\N	app	\N	397	250
1656	577c43cd-c126-4102-aa42-11f854ed859e	12:00 AM	11:59 PM	f	\N	app	\N	397	800
1657	51516aa0-0d2d-46a5-908f-918532b7d27c	06:00 AM	10:00 AM	f	\N	app	\N	398	250
1658	12701d80-8614-44af-a65e-162c462a7476	10:00 AM	02:00 PM	f	\N	app	\N	398	300
1659	8eeeba6f-99aa-4763-ae5f-01e1b0d328cc	02:00 PM	06:00 PM	f	\N	app	\N	398	300
1660	dbe4fc06-31fd-4d64-b589-45a05f723005	06:00 PM	10:00 PM	f	\N	app	\N	398	250
1661	fc62d2ce-00a2-43aa-af64-30a92a4a32bc	12:00 AM	11:59 PM	f	\N	app	\N	398	800
1662	3b507c70-c556-4c48-96f6-073a161586b1	06:00 AM	10:00 AM	f	\N	app	\N	399	250
1663	bb82e229-3437-4d7b-b9fb-a8f4e5c3ba81	10:00 AM	02:00 PM	f	\N	app	\N	399	300
1664	3d2adb62-fa75-484c-b332-abeae5cc756d	02:00 PM	06:00 PM	f	\N	app	\N	399	300
1665	d8774b2e-6702-45b3-a3b9-8e75ca2fa267	06:00 PM	10:00 PM	f	\N	app	\N	399	250
1666	5015c2b4-19d2-416c-a0b9-4a056bf27cf9	12:00 AM	11:59 PM	f	\N	app	\N	399	800
1667	fff8ae46-a844-45fe-bbdc-e02733f06d63	06:00 AM	10:00 AM	f	\N	app	\N	400	250
1668	b8fa8305-2d1a-4ea0-a432-fb600836119e	10:00 AM	02:00 PM	f	\N	app	\N	400	300
1669	78b47078-60d1-41e4-bf1b-514cb27fe062	02:00 PM	06:00 PM	f	\N	app	\N	400	300
1670	26d357c0-9447-4c08-90dc-c1145954e18a	06:00 PM	10:00 PM	f	\N	app	\N	400	250
1671	67e4747f-fbeb-4d51-ba0d-08ab75acc7ef	12:00 AM	11:59 PM	f	\N	app	\N	400	800
1672	e29851ea-b8b0-4a94-9b0a-fbf41f12a00b	06:00 AM	10:00 AM	f	\N	app	\N	401	250
1673	f4b7054e-a889-490e-89a6-71ba28737cad	10:00 AM	02:00 PM	f	\N	app	\N	401	300
1674	38a9bbdc-e978-4b48-8a18-919d917134f8	02:00 PM	06:00 PM	f	\N	app	\N	401	300
1675	2c820f73-eca2-42df-8d1b-a18671d44bf6	06:00 PM	10:00 PM	f	\N	app	\N	401	250
847	ab39686c-6ef0-4133-a4da-d2642e1efc56	06:00 AM	10:00 AM	f	\N	app	\N	236	350
848	30bc8c68-8866-49a1-8771-6b73305031fb	10:00 AM	02:00 PM	f	\N	app	\N	236	350
849	88879532-1e44-4e17-9390-d0b42f13745c	02:00 PM	06:00 PM	f	\N	app	\N	236	350
850	509c949a-217d-4a6b-8ce7-633b85ca9099	06:00 PM	10:00 PM	f	\N	app	\N	236	350
851	03c3c793-2706-4f97-a55d-7146de8ba95f	12:00 AM	11:59 PM	f	\N	app	\N	236	1200
852	e061e2ad-e3e7-4bdd-880e-3aaa407c481e	06:00 AM	10:00 AM	f	\N	app	\N	237	350
853	ca3640fc-f924-497c-8099-f5a32612aae0	10:00 AM	02:00 PM	f	\N	app	\N	237	350
854	b55d3454-7d95-46a6-86b9-2298867570b9	02:00 PM	06:00 PM	f	\N	app	\N	237	350
855	d82ad2a6-82cb-4c12-bc18-ec8087829720	06:00 PM	10:00 PM	f	\N	app	\N	237	350
856	a51058ef-256f-41db-8cf1-c1fd10c6b705	12:00 AM	11:59 PM	f	\N	app	\N	237	1200
857	c641b3a2-82fb-445c-bac2-042b38e07d81	06:00 AM	10:00 AM	f	\N	app	\N	238	350
858	7e759741-4241-41ae-a14c-c1318b894fc3	10:00 AM	02:00 PM	f	\N	app	\N	238	350
859	b9e92a68-4a70-43fd-84d7-640035ec6d27	02:00 PM	06:00 PM	f	\N	app	\N	238	350
860	ca07dbf2-b2b6-4d0f-8dd2-1aee8b31183d	06:00 PM	10:00 PM	f	\N	app	\N	238	350
861	7282431b-ee18-4b14-8370-0eb79d9327d2	12:00 AM	11:59 PM	f	\N	app	\N	238	1200
862	3ff7f3fe-a4c7-4fd1-88d9-872d34d45dba	06:00 AM	10:00 AM	f	\N	app	\N	239	350
863	a11136c6-3364-4c22-9824-1cee48c94a91	10:00 AM	02:00 PM	f	\N	app	\N	239	350
864	ef02f969-b194-4039-84a0-0c326d058f2d	02:00 PM	06:00 PM	f	\N	app	\N	239	350
865	e01c9a3d-642d-4b8f-9d2e-2f02d3daf69b	06:00 PM	10:00 PM	f	\N	app	\N	239	350
866	010c24ff-d8fe-4dbc-8032-c789a107dbfb	12:00 AM	11:59 PM	f	\N	app	\N	239	1200
867	c419b5db-ca5a-43bb-b0d1-c5a6dad8d886	06:00 AM	10:00 AM	f	\N	app	\N	240	350
868	fcdae5b5-0614-4476-8229-aa16d05d8d1e	10:00 AM	02:00 PM	f	\N	app	\N	240	350
869	5c3e6ff3-c81c-4d12-809e-736d0e9f1712	02:00 PM	06:00 PM	f	\N	app	\N	240	350
870	48f795e0-9151-4905-ad00-e795bf670ec0	06:00 PM	10:00 PM	f	\N	app	\N	240	350
871	0833d20d-bbc1-4dbc-8542-a0abdfe2c9c7	12:00 AM	11:59 PM	f	\N	app	\N	240	1200
872	f28e22df-04c8-4f81-ac44-505c439c15a1	06:00 AM	10:00 AM	f	\N	app	\N	241	350
873	a9c3680e-31fc-49d5-b61d-424f9cdf5149	10:00 AM	02:00 PM	f	\N	app	\N	241	350
874	02fd9f28-a545-4f8a-b7e7-6859831b65cb	02:00 PM	06:00 PM	f	\N	app	\N	241	350
875	48c0f32e-3435-4cb3-9049-8e9ec44f47ea	06:00 PM	10:00 PM	f	\N	app	\N	241	350
876	8c9a6b6d-ca55-4326-817f-3df48e751f92	12:00 AM	11:59 PM	f	\N	app	\N	241	1200
877	d2bdc05d-c474-402b-8b70-634c1d2593ea	06:00 AM	10:00 AM	f	\N	app	\N	242	350
878	358b68f3-31a7-480d-8d13-34e5d20143ae	10:00 AM	02:00 PM	f	\N	app	\N	242	350
879	02c15a44-60a3-4f76-a1a7-41a08b25b35b	02:00 PM	06:00 PM	f	\N	app	\N	242	350
880	7548354d-9fb8-4b3f-85bb-7549e8f9bed4	06:00 PM	10:00 PM	f	\N	app	\N	242	350
881	f07909e3-a882-436c-a716-aa2b0ed379c0	12:00 AM	11:59 PM	f	\N	app	\N	242	1200
882	2c5b201e-2577-498e-835b-2be2335472f1	06:00 AM	10:00 AM	f	\N	app	\N	243	350
883	2dafd089-6bc0-4ff2-aef5-f1a0f7ca4989	10:00 AM	02:00 PM	f	\N	app	\N	243	350
884	c3d88222-33ee-4878-ad28-d30d1ff0aba3	02:00 PM	06:00 PM	f	\N	app	\N	243	350
885	32ee0edd-b635-4d69-90ca-d6e79bf44c96	06:00 PM	10:00 PM	f	\N	app	\N	243	350
886	62793938-95cc-4ecf-a2c0-08dedb4c63ba	12:00 AM	11:59 PM	f	\N	app	\N	243	1200
887	1a8c855d-c58b-4435-9f28-14b913129635	06:00 AM	10:00 AM	f	\N	app	\N	244	350
888	5293ac38-5cea-43fd-9e45-f4a878364cc7	10:00 AM	02:00 PM	f	\N	app	\N	244	350
889	0d8df1dd-dfee-4413-a1b2-e5555d732854	02:00 PM	06:00 PM	f	\N	app	\N	244	350
890	46c49ddc-4e5c-4ca7-9778-4c14ba9dc192	06:00 PM	10:00 PM	f	\N	app	\N	244	350
891	06bc8cdf-2104-4299-8146-01dd02abca46	12:00 AM	11:59 PM	f	\N	app	\N	244	1200
892	57b6141c-c4e3-490c-82e1-6d411ff7fd0f	06:00 AM	10:00 AM	f	\N	app	\N	245	350
893	0cef66ce-fdd8-40bd-8036-569c79166d75	10:00 AM	02:00 PM	f	\N	app	\N	245	350
894	282f61bb-5cb4-4b38-a738-b07420182125	02:00 PM	06:00 PM	f	\N	app	\N	245	350
895	6989d542-2bda-4e17-8db7-412ddee56804	06:00 PM	10:00 PM	f	\N	app	\N	245	350
896	369605d9-24d4-4ea4-8210-af3de69c470e	12:00 AM	11:59 PM	f	\N	app	\N	245	1200
897	60d55859-00d0-4204-bc47-b06fd78846ae	06:00 AM	10:00 AM	f	\N	app	\N	246	350
898	4470a192-9783-46dc-bb94-59afdbd3530e	10:00 AM	02:00 PM	f	\N	app	\N	246	350
899	8ee12efd-a660-40a9-b8df-ed62446d054b	02:00 PM	06:00 PM	f	\N	app	\N	246	350
900	14a0a7f5-9428-494d-9040-07c5ca31c065	06:00 PM	10:00 PM	f	\N	app	\N	246	350
901	8b79d477-9e72-43dc-b0b8-41a805f02a6c	12:00 AM	11:59 PM	f	\N	app	\N	246	1200
902	b51ddf1e-a650-4b01-b563-d79d71e915b2	06:00 AM	10:00 AM	f	\N	app	\N	247	350
903	6df50b03-1702-4b7a-bc81-005cf21ea939	10:00 AM	02:00 PM	f	\N	app	\N	247	350
904	269f0514-4082-486f-bd73-1266677afc50	02:00 PM	06:00 PM	f	\N	app	\N	247	350
905	70202643-ae33-4975-93af-75e62302f639	06:00 PM	10:00 PM	f	\N	app	\N	247	350
906	f94f970c-8d38-44ea-824e-2771dd16c465	12:00 AM	11:59 PM	f	\N	app	\N	247	1200
907	f8c4a200-72c6-41b9-86c3-a95ca14da16c	06:00 AM	10:00 AM	f	\N	app	\N	248	350
908	1aa722ef-b5d2-4957-b1fd-d7ba6f609df5	10:00 AM	02:00 PM	f	\N	app	\N	248	350
909	99c10a19-28af-451b-adc7-2128e3c42470	02:00 PM	06:00 PM	f	\N	app	\N	248	350
910	d71f0a2b-c5aa-45b9-9be5-f717b694eba6	06:00 PM	10:00 PM	f	\N	app	\N	248	350
911	994c0ece-ffeb-47f9-bf35-2e0885be43dd	12:00 AM	11:59 PM	f	\N	app	\N	248	1200
912	5c82c11b-7614-4da5-bda0-d8befa704c42	06:00 AM	10:00 AM	f	\N	app	\N	249	350
913	34efbbb6-9b26-48c4-ac37-b7a20a6f0744	10:00 AM	02:00 PM	f	\N	app	\N	249	350
914	7869f80e-d448-4fca-9803-cb9cc0d92aff	02:00 PM	06:00 PM	f	\N	app	\N	249	350
915	970947ed-e2a7-471f-82ff-8f84dcc570cc	06:00 PM	10:00 PM	f	\N	app	\N	249	350
916	d1bd239b-b7c3-4e40-9357-9538166fadbb	12:00 AM	11:59 PM	f	\N	app	\N	249	1200
917	c248028c-00ee-48f1-a8e4-0004dbd431a5	06:00 AM	10:00 AM	f	\N	app	\N	250	350
918	319fde84-a4ac-4a39-9a56-0bcc138b8e7d	10:00 AM	02:00 PM	f	\N	app	\N	250	350
919	3d55de8e-d72d-4ef6-9946-a3e6df2ed89f	02:00 PM	06:00 PM	f	\N	app	\N	250	350
920	c21358ba-194e-4bb4-8859-7d1c56079b8b	06:00 PM	10:00 PM	f	\N	app	\N	250	350
921	72d7131c-fef9-4671-88ce-03c18d212b38	12:00 AM	11:59 PM	f	\N	app	\N	250	1200
922	170151a2-1917-42aa-9236-abf825efbc63	06:00 AM	10:00 AM	f	\N	app	\N	251	350
923	c75c65e3-94bd-483e-b5d5-cddd8b237adc	10:00 AM	02:00 PM	f	\N	app	\N	251	350
924	1271ff63-37a3-4aff-a897-ac987272dada	02:00 PM	06:00 PM	f	\N	app	\N	251	350
925	7d42f13b-4d0b-41fd-a497-c4202d61e98e	06:00 PM	10:00 PM	f	\N	app	\N	251	350
926	018721dc-6a0a-438b-882b-9c04ec245532	12:00 AM	11:59 PM	f	\N	app	\N	251	1200
927	75a823c9-93bc-4ec3-a925-4b4689012435	06:00 AM	10:00 AM	f	\N	app	\N	252	350
928	a2d530ba-ee0a-4745-801e-db99cd6352ca	10:00 AM	02:00 PM	f	\N	app	\N	252	350
929	55f5b9e2-5fa6-4c5d-ab40-42e54896610d	02:00 PM	06:00 PM	f	\N	app	\N	252	350
930	39fbb896-3ae4-4cdb-8a2c-b3a097acfbfa	06:00 PM	10:00 PM	f	\N	app	\N	252	350
931	3d919c1e-8997-4d65-a138-d958a102dd94	12:00 AM	11:59 PM	f	\N	app	\N	252	1200
932	1b46aad6-a3ed-4101-96f1-e6bdef74dd7e	06:00 AM	10:00 AM	f	\N	app	\N	253	350
933	041f095b-ae0e-438e-88b6-fa40f1aef0f1	10:00 AM	02:00 PM	f	\N	app	\N	253	350
934	0cf722c2-0632-4ba5-a29e-60eb9b6a661e	02:00 PM	06:00 PM	f	\N	app	\N	253	350
935	dbbee398-3d53-41a5-8654-c953c67a6667	06:00 PM	10:00 PM	f	\N	app	\N	253	350
936	4116f3f2-21a4-4be4-9547-6c8d65ada2cf	12:00 AM	11:59 PM	f	\N	app	\N	253	1200
937	4857d294-cb1a-4a21-8f96-be0b155d9273	06:00 AM	10:00 AM	f	\N	app	\N	254	350
938	e9c63065-602f-4858-a857-b6ecc26531c5	10:00 AM	02:00 PM	f	\N	app	\N	254	350
939	48c86dee-0a91-4139-9952-1651481bb5e1	02:00 PM	06:00 PM	f	\N	app	\N	254	350
940	70a03ae5-b15e-49b1-b9eb-65f6476bd2b7	06:00 PM	10:00 PM	f	\N	app	\N	254	350
941	454a571d-911a-4550-bd46-a71a75889e4b	12:00 AM	11:59 PM	f	\N	app	\N	254	1200
942	d0399a48-8579-48cf-87a6-9d9f46c6aa50	06:00 AM	10:00 AM	f	\N	app	\N	255	350
943	18dd3eb8-29f7-48d7-a670-e8eb1aab3457	10:00 AM	02:00 PM	f	\N	app	\N	255	350
944	693b9647-83a8-433d-9140-7dba9d901e14	02:00 PM	06:00 PM	f	\N	app	\N	255	350
945	6ba88d94-5b19-4c50-a1a8-8fb9e440d75f	06:00 PM	10:00 PM	f	\N	app	\N	255	350
946	3d4f7135-f6af-410f-a2e1-9318a3c59ed8	12:00 AM	11:59 PM	f	\N	app	\N	255	1200
947	f24ed3a8-f7e0-4ef2-8769-da430116da4a	06:00 AM	10:00 AM	f	\N	app	\N	256	350
948	1db9da36-37bd-4314-be72-2e56c39bcf8a	10:00 AM	02:00 PM	f	\N	app	\N	256	350
949	3aaa06d0-30d9-44c7-9eeb-003d1228a1a1	02:00 PM	06:00 PM	f	\N	app	\N	256	350
950	0108071b-8fa0-4755-9522-1a2278955c12	06:00 PM	10:00 PM	f	\N	app	\N	256	350
951	e7cb0ade-e1d1-464a-bd52-8964e3993910	12:00 AM	11:59 PM	f	\N	app	\N	256	1200
952	12d585b6-802c-43f8-b282-e05f07efea39	06:00 AM	10:00 AM	f	\N	app	\N	257	350
953	bbf01f75-b1a4-41f1-8e4e-247e2931e0a6	10:00 AM	02:00 PM	f	\N	app	\N	257	350
954	19b780ef-1c71-4e03-b024-20185be79d71	02:00 PM	06:00 PM	f	\N	app	\N	257	350
955	38d31213-a476-4e76-bee8-2c3749af34d8	06:00 PM	10:00 PM	f	\N	app	\N	257	350
956	d68c68bd-f919-4e52-bef1-037fe743bed3	12:00 AM	11:59 PM	f	\N	app	\N	257	1200
957	7eb4f396-d1fa-4e51-8699-4601be7d9195	06:00 AM	10:00 AM	f	\N	app	\N	258	350
958	f128ebe9-c9fd-4655-bba7-f11df9516c5c	10:00 AM	02:00 PM	f	\N	app	\N	258	350
959	54f0cea7-5198-4e5a-bdb3-02aa361b1fe9	02:00 PM	06:00 PM	f	\N	app	\N	258	350
960	3ac38967-db10-4032-acf5-80b03b481893	06:00 PM	10:00 PM	f	\N	app	\N	258	350
961	ee6c70db-a60f-4316-b77a-113319e372df	12:00 AM	11:59 PM	f	\N	app	\N	258	1200
962	8e9c3d66-d657-4ca3-8f4b-135052f65fd3	06:00 AM	10:00 AM	f	\N	app	\N	259	350
963	b46d213f-edb7-4bae-912f-9b0dc2e04b69	10:00 AM	02:00 PM	f	\N	app	\N	259	350
964	cb010017-86c2-49c9-b0b4-8350bb42bd48	02:00 PM	06:00 PM	f	\N	app	\N	259	350
965	327801f7-1df6-4d68-b123-578951d8cf50	06:00 PM	10:00 PM	f	\N	app	\N	259	350
966	f5e7cfbf-828a-4843-bd4b-d69b8bec2ba5	12:00 AM	11:59 PM	f	\N	app	\N	259	1200
967	17508525-dcf6-449c-b933-04be473f9ecf	06:00 AM	10:00 AM	f	\N	app	\N	260	350
968	49efb0cb-3ae3-4360-b5bb-7c66e329c8ec	10:00 AM	02:00 PM	f	\N	app	\N	260	350
969	ab756d6f-d49d-4893-8e2e-0887b768b5f9	02:00 PM	06:00 PM	f	\N	app	\N	260	350
970	8052fe37-7e93-4abc-bb51-7d268a239eea	06:00 PM	10:00 PM	f	\N	app	\N	260	350
971	918c8b6a-cc64-4343-ab0e-7e2870eda9a6	12:00 AM	11:59 PM	f	\N	app	\N	260	1200
972	e4d22ae1-72a4-4692-acd7-e4fa685e383e	06:00 AM	10:00 AM	f	\N	app	\N	261	350
973	22c0707d-da25-4124-ba4a-ae3b5eb7373b	10:00 AM	02:00 PM	f	\N	app	\N	261	350
974	1049219d-1ec0-43b7-bc46-f8427284295d	02:00 PM	06:00 PM	f	\N	app	\N	261	350
975	5cde3fc1-6e26-4a21-8d35-f102205d3aa4	06:00 PM	10:00 PM	f	\N	app	\N	261	350
976	2ea6753f-e0d6-491a-b2b5-d9442653f04e	12:00 AM	11:59 PM	f	\N	app	\N	261	1200
977	dbe38914-a380-486d-b873-b5ce19dc34b9	06:00 AM	10:00 AM	f	\N	app	\N	262	350
978	6d9e1555-48c7-44d7-9e57-a30f46b3ded7	10:00 AM	02:00 PM	f	\N	app	\N	262	350
979	fbfe8a49-de82-494c-9a46-8809e43b6cb3	02:00 PM	06:00 PM	f	\N	app	\N	262	350
980	63d9d12b-4d13-4050-9012-5d61ac3c3ca5	06:00 PM	10:00 PM	f	\N	app	\N	262	350
981	588d89a7-ddb1-4e35-82c2-b4b9e60f7b89	12:00 AM	11:59 PM	f	\N	app	\N	262	1200
982	5f04f0c1-1a3e-4b85-83a4-aec3897f7ad4	06:00 AM	10:00 AM	f	\N	app	\N	263	350
983	a90fb63e-5964-4473-968d-1e556ed7d9c3	10:00 AM	02:00 PM	f	\N	app	\N	263	350
984	a5f647d4-ca2b-49d0-9bc3-e8b2903c7277	02:00 PM	06:00 PM	f	\N	app	\N	263	350
985	802b330d-ee80-46c1-bb78-4d5fa8f59971	06:00 PM	10:00 PM	f	\N	app	\N	263	350
986	f982d7c3-9d4f-4f4e-b003-41808276fe24	12:00 AM	11:59 PM	f	\N	app	\N	263	1200
987	9504672e-ee90-4a1d-869f-79ce7f455d10	06:00 AM	10:00 AM	f	\N	app	\N	264	350
988	82b566c8-76a3-4897-a101-5239b7a46ef6	10:00 AM	02:00 PM	f	\N	app	\N	264	350
989	2654b447-6a66-4ec4-8105-579bf0b48600	02:00 PM	06:00 PM	f	\N	app	\N	264	350
990	af22b49b-7ffa-47f2-982c-310acfa7e7af	06:00 PM	10:00 PM	f	\N	app	\N	264	350
991	f6ee7376-9a4a-4dc8-8c02-2bffdf9d71d4	12:00 AM	11:59 PM	f	\N	app	\N	264	1200
992	2eab773f-93b1-46dc-81ba-97fd58bac15e	06:00 AM	10:00 AM	f	\N	app	\N	265	350
993	3482a754-b29a-468a-8ac0-048759d0620f	10:00 AM	02:00 PM	f	\N	app	\N	265	350
994	21e48e94-0f81-478e-b56d-12ee9f12462f	02:00 PM	06:00 PM	f	\N	app	\N	265	350
995	930b861a-162e-47cc-812f-cc6397b2e7f0	06:00 PM	10:00 PM	f	\N	app	\N	265	350
996	1679e4d0-275e-4133-9468-805e944c0af0	12:00 AM	11:59 PM	f	\N	app	\N	265	1200
997	67c3bc7b-3736-47d8-a20d-15997b63b8e3	06:00 AM	10:00 AM	f	\N	app	\N	266	350
998	0570c3ba-7613-4dd6-bf1c-447dd3e60608	10:00 AM	02:00 PM	f	\N	app	\N	266	350
999	a35daa47-b8c7-42ac-9779-285a0316bcd7	02:00 PM	06:00 PM	f	\N	app	\N	266	350
1000	936751c1-6f76-4a69-9fe3-2a9d820cc4a2	06:00 PM	10:00 PM	f	\N	app	\N	266	350
1001	7b56223f-84e2-4965-bba8-9b357f324a66	12:00 AM	11:59 PM	f	\N	app	\N	266	1200
1002	8423c7b4-c64a-4ef2-85e0-51787ac136ac	06:00 AM	10:00 AM	f	\N	app	\N	267	350
1003	8b9f05d1-c802-449a-a584-fff08f96c5af	10:00 AM	02:00 PM	f	\N	app	\N	267	350
1004	a0f08195-7a5f-4b81-aa06-25a98517d047	02:00 PM	06:00 PM	f	\N	app	\N	267	350
1005	e95782a2-ee20-4bd3-ae1c-7ea6f32d2b30	06:00 PM	10:00 PM	f	\N	app	\N	267	350
1006	901aec60-2c19-49b8-bc31-c69a497917b8	12:00 AM	11:59 PM	f	\N	app	\N	267	1200
1007	4f34000b-e1bd-4b8b-8243-a916507aa4ad	06:00 AM	10:00 AM	f	\N	app	\N	268	350
1008	d406462f-26d4-4106-88b1-874b0cc79a78	10:00 AM	02:00 PM	f	\N	app	\N	268	350
1009	0360d551-28a4-4b1b-a71f-70e5aa374b2f	02:00 PM	06:00 PM	f	\N	app	\N	268	350
1010	a4cd721b-a46f-4597-958b-da444c5eeb88	06:00 PM	10:00 PM	f	\N	app	\N	268	350
1011	82d21cbe-1302-4dc4-aabc-9a77c783dd9b	12:00 AM	11:59 PM	f	\N	app	\N	268	1200
1012	b4b73d07-8d06-4d99-9969-191cb2ee21f3	06:00 AM	10:00 AM	f	\N	app	\N	269	350
1013	80ab10a6-56f6-4f45-a0ec-1dbcb97dd908	10:00 AM	02:00 PM	f	\N	app	\N	269	350
1014	9127a2c8-b271-48d4-b3dd-419d79d63b4b	02:00 PM	06:00 PM	f	\N	app	\N	269	350
1015	3a22a16d-94db-4592-9f30-dc51164fd193	06:00 PM	10:00 PM	f	\N	app	\N	269	350
1016	70ea9724-6565-446d-8e2d-5138dcfda487	12:00 AM	11:59 PM	f	\N	app	\N	269	1200
1017	cd4cce86-459a-4d21-a87b-c69c6a6717cb	06:00 AM	10:00 AM	f	\N	app	\N	270	350
1018	b4202c48-1e70-4835-bb89-b0bf170030d8	10:00 AM	02:00 PM	f	\N	app	\N	270	350
1019	fb87864f-4263-4f5b-a538-362ad82e6e17	02:00 PM	06:00 PM	f	\N	app	\N	270	350
1020	d12902a6-8d53-4ffd-b606-7e28f2d8c81b	06:00 PM	10:00 PM	f	\N	app	\N	270	350
1021	56e74bf1-fb32-498a-a23b-72a3468e68a7	12:00 AM	11:59 PM	f	\N	app	\N	270	1200
1022	918135db-576f-4c3b-8f10-bba7fd5d3287	06:00 AM	10:00 AM	f	\N	app	\N	271	350
1023	e5cdd9bf-b9e5-4741-9510-89b895efe9c1	10:00 AM	02:00 PM	f	\N	app	\N	271	350
1024	972a823a-7be0-4b17-8283-0c795b3f015a	02:00 PM	06:00 PM	f	\N	app	\N	271	350
1025	75b90311-360a-4b14-ab3f-6d79432a8623	06:00 PM	10:00 PM	f	\N	app	\N	271	350
1026	f6af3490-e312-4246-babb-625bae3a8cfd	12:00 AM	11:59 PM	f	\N	app	\N	271	1200
1027	5a9b9b4b-c4f4-4ca4-939f-914e8e704d13	06:00 AM	10:00 AM	f	\N	app	\N	272	350
1028	329fb291-4330-4052-9dad-48048396ad09	10:00 AM	02:00 PM	f	\N	app	\N	272	350
1029	d7682dc4-9a65-4942-9a85-f0593f39b17a	02:00 PM	06:00 PM	f	\N	app	\N	272	350
1030	5669fe44-f529-46b6-a94b-2724b701c463	06:00 PM	10:00 PM	f	\N	app	\N	272	350
1031	fa92943f-b246-4a9b-8a91-ece8dd8785c2	12:00 AM	11:59 PM	f	\N	app	\N	272	1200
1032	9b203301-83fd-4912-a717-bb275ca4381b	06:00 AM	10:00 AM	f	\N	app	\N	273	350
1033	ca021c33-c5b7-4c44-8268-d78d9d77e7f2	10:00 AM	02:00 PM	f	\N	app	\N	273	350
1034	10ff6350-f0ac-47b4-a0f7-2bb5297baad3	02:00 PM	06:00 PM	f	\N	app	\N	273	350
1035	c5533de3-4507-4ef9-bfff-b06cedcf7778	06:00 PM	10:00 PM	f	\N	app	\N	273	350
1036	f2f30ace-12db-41fc-9f2c-3bea54012394	12:00 AM	11:59 PM	f	\N	app	\N	273	1200
1037	49820d1c-ac97-4a47-b3cb-642128fcf04b	06:00 AM	10:00 AM	f	\N	app	\N	274	350
1038	32677ad5-9907-4c75-bbe1-f143cae0ca9e	10:00 AM	02:00 PM	f	\N	app	\N	274	350
1039	2641d5f7-59e1-4bf1-9e9c-d00a6b7da859	02:00 PM	06:00 PM	f	\N	app	\N	274	350
1040	aab35877-b0af-4af8-bee0-378c2ea69e4b	06:00 PM	10:00 PM	f	\N	app	\N	274	350
1041	228d21b5-4932-4ed7-9964-46786a4735e3	12:00 AM	11:59 PM	f	\N	app	\N	274	1200
1042	b8f5bd03-cf67-4bca-8b8d-fd3f9ab6cdb0	06:00 AM	10:00 AM	f	\N	app	\N	275	350
1043	757a278b-1d71-48de-9e7e-d02b5da9b194	10:00 AM	02:00 PM	f	\N	app	\N	275	350
1044	0c3e7d85-30ae-4648-9a07-b535f6371280	02:00 PM	06:00 PM	f	\N	app	\N	275	350
1045	0ab178ca-0be9-4749-a564-7b5db84bedc3	06:00 PM	10:00 PM	f	\N	app	\N	275	350
1046	41149434-0b47-4980-9fba-371d63779e00	12:00 AM	11:59 PM	f	\N	app	\N	275	1200
1047	bd3f37dd-af7b-476e-bc7c-8c861624df3f	06:00 AM	10:00 AM	f	\N	app	\N	276	350
1048	4abc3a29-0820-40bd-9289-05ec6fd0e6be	10:00 AM	02:00 PM	f	\N	app	\N	276	350
1049	a39be636-52df-4b5d-94a8-d0e9ace69e1a	02:00 PM	06:00 PM	f	\N	app	\N	276	350
1050	fb8216bb-c60f-40a3-8315-6ebee9788d46	06:00 PM	10:00 PM	f	\N	app	\N	276	350
1051	ee4ddc16-0e81-4941-8ec2-792d300224ad	12:00 AM	11:59 PM	f	\N	app	\N	276	1200
1052	58927f7e-9ad0-4289-9a17-566be3b6c9f6	06:00 AM	10:00 AM	f	\N	app	\N	277	350
1053	93b483ae-9e59-417f-a16b-836c75e5b3a6	10:00 AM	02:00 PM	f	\N	app	\N	277	350
1054	600f87bb-c0b5-4c07-9e0d-2a917138894b	02:00 PM	06:00 PM	f	\N	app	\N	277	350
1055	31428c3e-f015-4fa3-9748-866cde443bac	06:00 PM	10:00 PM	f	\N	app	\N	277	350
1056	fd5cac9a-763e-4e0f-b2c8-a011cb46ea85	12:00 AM	11:59 PM	f	\N	app	\N	277	1200
1057	11433873-1b4a-49db-9c49-2056f5f29d7b	06:00 AM	10:00 AM	f	\N	app	\N	278	350
1058	9fb1f275-4837-4692-a87e-5c814d9540f7	10:00 AM	02:00 PM	f	\N	app	\N	278	350
1059	0a338d69-3f12-4ed4-baa1-77dd0bcc9a5a	02:00 PM	06:00 PM	f	\N	app	\N	278	350
1060	52067008-5847-47cf-9aa1-115c61c73563	06:00 PM	10:00 PM	f	\N	app	\N	278	350
1061	98c42e82-57e0-456f-a47c-817b106b4f39	12:00 AM	11:59 PM	f	\N	app	\N	278	1200
1062	84bd99de-ff76-4e55-9e28-b1e73f27ac93	06:00 AM	10:00 AM	f	\N	app	\N	279	350
1063	681ec0b2-4a18-4563-b2b6-ccbcf5f43e8a	10:00 AM	02:00 PM	f	\N	app	\N	279	350
1064	9444b182-a61a-43df-a8d2-7c5e81ac186b	02:00 PM	06:00 PM	f	\N	app	\N	279	350
1065	478d8bf4-48f4-489b-9ba8-d108968d857a	06:00 PM	10:00 PM	f	\N	app	\N	279	350
1066	f30fdd49-acd7-4fcf-b67c-a73894de1c81	12:00 AM	11:59 PM	f	\N	app	\N	279	1200
1067	956f62e7-43a9-4838-aa20-b7b94e9c6a21	06:00 AM	10:00 AM	f	\N	app	\N	280	350
1068	b830629e-239c-4f03-878f-562db720854e	10:00 AM	02:00 PM	f	\N	app	\N	280	350
1069	6292efaf-dced-4357-b12b-138d8bf2b12c	02:00 PM	06:00 PM	f	\N	app	\N	280	350
1070	60d811b8-6963-4938-b46b-fe3892a347af	06:00 PM	10:00 PM	f	\N	app	\N	280	350
1071	93f9345e-14e4-4a6f-b9f9-1073f44679bf	12:00 AM	11:59 PM	f	\N	app	\N	280	1200
1072	2f5ac798-749c-43e3-9bb4-8f4187ffccfa	06:00 AM	10:00 AM	f	\N	app	\N	281	350
1073	1d8fd5fa-d0a2-41d0-8876-bb78cc82b60f	10:00 AM	02:00 PM	f	\N	app	\N	281	350
1074	6af7b290-446b-482d-9ca5-dc260ebf9b53	02:00 PM	06:00 PM	f	\N	app	\N	281	350
1075	30ca20e3-9c69-4e56-9151-0fe24a120635	06:00 PM	10:00 PM	f	\N	app	\N	281	350
1076	30e49b4b-b289-420a-89f0-20af68bfb3e5	12:00 AM	11:59 PM	f	\N	app	\N	281	1200
1077	cd51ab8f-5662-46ae-9b67-e234b01c788c	06:00 AM	10:00 AM	f	\N	app	\N	282	350
1078	30164598-c783-4cca-abc6-232dad6fcd03	10:00 AM	02:00 PM	f	\N	app	\N	282	350
1079	0916ed0b-6755-45d1-b8f8-bccd0794b25a	02:00 PM	06:00 PM	f	\N	app	\N	282	350
1080	b933c091-19c3-4b2c-8ac2-941a685426a8	06:00 PM	10:00 PM	f	\N	app	\N	282	350
1081	abf54aeb-695f-40ec-9e17-48427fc474a4	12:00 AM	11:59 PM	f	\N	app	\N	282	1200
1082	63835a47-74fb-4c05-ba6e-be370d802c36	06:00 AM	10:00 AM	f	\N	app	\N	283	350
1083	90609944-a15b-4176-9e6a-38cf100f7684	10:00 AM	02:00 PM	f	\N	app	\N	283	350
1084	fc0e8fd7-95f5-49d3-b2e2-e74a473f3300	02:00 PM	06:00 PM	f	\N	app	\N	283	350
1085	77b0b12e-36d5-4e12-8fad-00988b7cf531	06:00 PM	10:00 PM	f	\N	app	\N	283	350
1086	0833b8bf-920c-4914-a2cd-c82d69e73bac	12:00 AM	11:59 PM	f	\N	app	\N	283	1200
1087	0cbb5a62-29f8-445f-8d80-2bd5c36e953f	06:00 AM	10:00 AM	f	\N	app	\N	284	350
1088	ffde2f2e-7915-4ebe-9bf3-73bc5cf802b1	10:00 AM	02:00 PM	f	\N	app	\N	284	350
1089	bd4d9f98-4f37-4205-828f-fa2eb5c20b6e	02:00 PM	06:00 PM	f	\N	app	\N	284	350
1090	5f44364d-ad24-472f-a013-6af9f5440dd0	06:00 PM	10:00 PM	f	\N	app	\N	284	350
1091	d0f70caa-133a-485d-a88b-02ef98b26d82	12:00 AM	11:59 PM	f	\N	app	\N	284	1200
1092	cce14b26-f101-4bf7-9bad-b89aab6cf285	06:00 AM	10:00 AM	f	\N	app	\N	285	350
1093	a4a16f76-3795-4a30-869f-42b972debf9e	10:00 AM	02:00 PM	f	\N	app	\N	285	350
1094	ff065324-c330-45b9-8f4d-a9f94b3b1a74	02:00 PM	06:00 PM	f	\N	app	\N	285	350
1095	49d3ad82-c8cb-4872-a694-70ded49ee2ba	06:00 PM	10:00 PM	f	\N	app	\N	285	350
1096	66815ded-af9e-4320-92bd-311fb2604e2c	12:00 AM	11:59 PM	f	\N	app	\N	285	1200
1097	5a8846a1-c6d4-40f7-9d4e-38f3a7fb689a	06:00 AM	10:00 AM	f	\N	app	\N	286	350
1098	606c2086-4487-48d0-bcb1-2ee21fe36717	10:00 AM	02:00 PM	f	\N	app	\N	286	350
1099	b73e6d2e-8ef7-4f31-b80c-9210b9d5f24f	02:00 PM	06:00 PM	f	\N	app	\N	286	350
1100	5cb38313-f106-4291-b137-d36b4897c03c	06:00 PM	10:00 PM	f	\N	app	\N	286	350
1101	296d4465-7f0f-4ce1-9318-ea39e0c5c841	12:00 AM	11:59 PM	f	\N	app	\N	286	1200
1102	d1ee2c82-acf0-447e-beb5-7fe910a6af87	06:00 AM	10:00 AM	f	\N	app	\N	287	350
1103	9d044dc0-fdab-4929-a169-085dd1436b6f	10:00 AM	02:00 PM	f	\N	app	\N	287	350
1104	76f8237f-212b-47eb-b3d5-0192dd757b3e	02:00 PM	06:00 PM	f	\N	app	\N	287	350
1105	e00ff9c8-da57-4520-8b22-ac625e2bf27e	06:00 PM	10:00 PM	f	\N	app	\N	287	350
1106	33968d72-716b-46d8-8a92-c5cc20f9d795	12:00 AM	11:59 PM	f	\N	app	\N	287	1200
1107	7272f2d2-748e-47de-a6d3-66d3be98eaaa	06:00 AM	10:00 AM	f	\N	app	\N	288	350
1108	58d43106-8584-49cf-990a-98d76024da2e	10:00 AM	02:00 PM	f	\N	app	\N	288	350
1109	b2101daa-de03-4676-adc9-4576c7ceb7e8	02:00 PM	06:00 PM	f	\N	app	\N	288	350
1110	b5f08658-65ec-4976-aeb9-41dd9d5db0f5	06:00 PM	10:00 PM	f	\N	app	\N	288	350
1111	9708eb1d-1a8f-4829-94b1-5770098de234	12:00 AM	11:59 PM	f	\N	app	\N	288	1200
1112	98d91767-edce-4256-9bad-7064923382df	06:00 AM	10:00 AM	f	\N	app	\N	289	350
1113	b5612797-c0f3-4288-aa16-ff72e4eccf4e	10:00 AM	02:00 PM	f	\N	app	\N	289	350
1114	47409115-e77f-4848-b5f7-5f98ebc91fc2	02:00 PM	06:00 PM	f	\N	app	\N	289	350
1115	157273c4-83ad-4d07-be17-e677669da6a6	06:00 PM	10:00 PM	f	\N	app	\N	289	350
1116	ba25965c-5cba-46dc-a343-87d6364c2dac	12:00 AM	11:59 PM	f	\N	app	\N	289	1200
1117	40fd50ee-d0e9-48b3-a13c-b65c8aed0e8d	06:00 AM	10:00 AM	f	\N	app	\N	290	350
1118	de50e24d-ea67-4801-a1ab-aef2c8c19c40	10:00 AM	02:00 PM	f	\N	app	\N	290	350
1119	27b0ccf3-72ce-47e4-a559-8b05c1e5027b	02:00 PM	06:00 PM	f	\N	app	\N	290	350
1120	5761de15-be47-45b1-a509-850dfd4f0e15	06:00 PM	10:00 PM	f	\N	app	\N	290	350
1121	bf51d359-e097-44a4-9f39-ca36337a36fb	12:00 AM	11:59 PM	f	\N	app	\N	290	1200
1122	5d748c84-d13b-48a1-b485-8d7f4b445bfd	06:00 AM	10:00 AM	f	\N	app	\N	291	350
1123	cfbf7a9d-bf41-4979-9905-0fd2664876da	10:00 AM	02:00 PM	f	\N	app	\N	291	350
1124	33ef5c1a-4e2c-4d82-8935-1a52f5715950	02:00 PM	06:00 PM	f	\N	app	\N	291	350
1125	88d63783-e7b3-4433-9c1a-8e8e21ee8e9b	06:00 PM	10:00 PM	f	\N	app	\N	291	350
1126	80960906-37f0-4ae7-ac1f-23c16e771c8c	12:00 AM	11:59 PM	f	\N	app	\N	291	1200
1127	1b04a1bf-a2ad-4803-8351-49e0dd28b5a2	06:00 AM	10:00 AM	f	\N	app	\N	292	350
1128	158d291c-8af1-42a3-a3e8-a195a1f45247	10:00 AM	02:00 PM	f	\N	app	\N	292	350
1129	85abed2a-ff83-44d1-8b47-f5779bbc6426	02:00 PM	06:00 PM	f	\N	app	\N	292	350
1130	42214db7-ada3-4a2e-b7f6-46053a6cd66e	06:00 PM	10:00 PM	f	\N	app	\N	292	350
1131	c5b35805-4fd3-41ab-a2cd-312ffcfdf3db	12:00 AM	11:59 PM	f	\N	app	\N	292	1200
1132	b53db979-70e1-45ad-8569-a58b4bab2622	06:00 AM	10:00 AM	f	\N	app	\N	293	350
1133	a595592c-5e93-4ad8-9837-fc3b1b813fbc	10:00 AM	02:00 PM	f	\N	app	\N	293	350
1134	9b8190ba-b567-47cd-8f5e-a8f6974bf0d0	02:00 PM	06:00 PM	f	\N	app	\N	293	350
1135	a6121a71-ad51-4d73-964b-85d1f20ba07c	06:00 PM	10:00 PM	f	\N	app	\N	293	350
1136	d8caaeff-fc50-416f-a45a-31c7de697856	12:00 AM	11:59 PM	f	\N	app	\N	293	1200
1137	e313f9bb-db16-4936-9f36-b8eadb17fb3a	06:00 AM	10:00 AM	f	\N	app	\N	294	350
1138	06ac4895-a164-463d-8749-b6e7ae3e35c7	10:00 AM	02:00 PM	f	\N	app	\N	294	350
1139	f29a70cd-f190-4317-aa87-79d1d2dce473	02:00 PM	06:00 PM	f	\N	app	\N	294	350
1140	e758726d-46ed-4748-b892-6014f0a568eb	06:00 PM	10:00 PM	f	\N	app	\N	294	350
1141	59ff6877-debe-451a-8045-ef855e42f661	12:00 AM	11:59 PM	f	\N	app	\N	294	1200
1142	4a5ccd6e-df50-4355-9009-4b5fe136cfe3	06:00 AM	10:00 AM	f	\N	app	\N	295	350
1143	3d4bb482-752b-4f82-b26b-fc02235d1f73	10:00 AM	02:00 PM	f	\N	app	\N	295	350
1144	3e055033-7bd8-4f80-8436-e0401d93b228	02:00 PM	06:00 PM	f	\N	app	\N	295	350
1145	127ed4e3-4344-40dc-a3a2-929fb337c8b4	06:00 PM	10:00 PM	f	\N	app	\N	295	350
1146	203ffffb-dd34-4a73-8240-05b1c9976ad2	12:00 AM	11:59 PM	f	\N	app	\N	295	1200
1147	1d547f90-91b4-4b90-98b1-9eed54da8e2f	06:00 AM	10:00 AM	f	\N	app	\N	296	350
1148	2eb5a1bd-b3e6-4979-b7e4-b123a62c3b42	10:00 AM	02:00 PM	f	\N	app	\N	296	350
1149	23994465-90fb-4915-9bf0-e3909569eb23	02:00 PM	06:00 PM	f	\N	app	\N	296	350
1150	e1a9199e-142a-48ad-90a3-1cb52681c087	06:00 PM	10:00 PM	f	\N	app	\N	296	350
1151	cea2023a-79e2-4f39-b53c-16299a9d28e2	12:00 AM	11:59 PM	f	\N	app	\N	296	1200
1152	4a1ce641-3103-4cc2-9e9a-ccaeabef26eb	06:00 AM	10:00 AM	f	\N	app	\N	297	350
1153	ac2656db-c0a0-47bb-9848-761dfea304f3	10:00 AM	02:00 PM	f	\N	app	\N	297	350
1154	829654dd-5b20-45e1-a361-4a01b65daa62	02:00 PM	06:00 PM	f	\N	app	\N	297	350
1155	d019be05-443f-456f-83b8-ddeeffdd7260	06:00 PM	10:00 PM	f	\N	app	\N	297	350
1156	baa3e86b-284a-4b37-90a8-5bd3181a24d8	12:00 AM	11:59 PM	f	\N	app	\N	297	1200
1157	e90597db-4c28-419e-bb6a-c139b51f812e	06:00 AM	10:00 AM	f	\N	app	\N	298	350
1158	1dfd909a-3f38-42f7-88cf-700a1dd2dae9	10:00 AM	02:00 PM	f	\N	app	\N	298	350
1159	75163e22-fb3c-4bb9-aed3-d765bd56e34b	02:00 PM	06:00 PM	f	\N	app	\N	298	350
1160	3324ff17-12aa-43e0-a209-d9ac6b7085d5	06:00 PM	10:00 PM	f	\N	app	\N	298	350
1161	c8ac4c80-f917-4715-8fd0-33fc6aabc721	12:00 AM	11:59 PM	f	\N	app	\N	298	1200
1162	067cb778-c372-4230-b709-df496af31c22	06:00 AM	10:00 AM	f	\N	app	\N	299	350
1163	a5a1494b-9102-479f-a6f5-d7e29737dcbe	10:00 AM	02:00 PM	f	\N	app	\N	299	350
1164	0f0d2fd6-1632-431e-aff4-9dc7611e84c7	02:00 PM	06:00 PM	f	\N	app	\N	299	350
1165	2b243d8c-2cde-4815-bd63-42ee9e4b5a9b	06:00 PM	10:00 PM	f	\N	app	\N	299	350
1166	60f59617-76a7-4009-a4cf-187335ae4d85	12:00 AM	11:59 PM	f	\N	app	\N	299	1200
1167	ce622429-9c7f-4c7d-a9a8-9660efa7c7f9	06:00 AM	10:00 AM	f	\N	app	\N	300	350
1168	df5ba188-ad0e-4a73-8772-9c3706e0d248	10:00 AM	02:00 PM	f	\N	app	\N	300	350
1169	1f6c8686-66a9-46e1-b479-13b0540237e2	02:00 PM	06:00 PM	f	\N	app	\N	300	350
1170	4db3026f-f2c5-4518-9818-c4ed47f4a767	06:00 PM	10:00 PM	f	\N	app	\N	300	347
1171	70eeface-b608-4977-9f68-c0b3f84989d6	12:00 AM	11:59 PM	f	\N	app	\N	300	1200
1172	8bd1e61f-c650-4d33-b227-f88521564ab3	06:00 AM	10:00 AM	f	\N	app	\N	301	350
1173	74be92e6-48d0-4381-a5d9-a3d69152bcc7	10:00 AM	02:00 PM	f	\N	app	\N	301	350
1174	8d85bc12-9cf5-4b77-9089-bd1e15aef99b	02:00 PM	06:00 PM	f	\N	app	\N	301	350
1175	889a7cc8-f5dd-46f1-9437-21ad0b815a33	06:00 PM	10:00 PM	f	\N	app	\N	301	347
1176	37562578-9f5c-43ef-9164-aecce09ec098	12:00 AM	11:59 PM	f	\N	app	\N	301	1200
1177	dcbfb6a7-e7bb-4ac9-b898-f19bb218d911	06:00 AM	10:00 AM	f	\N	app	\N	302	350
1178	073e7073-01ee-4ac3-b3d2-a79a1a3da1cc	10:00 AM	02:00 PM	f	\N	app	\N	302	350
1179	ad310b6d-ea57-4d8d-b372-5360a841992c	02:00 PM	06:00 PM	f	\N	app	\N	302	350
1180	3eeeced5-a885-489a-9b56-051fb6d253c0	06:00 PM	10:00 PM	f	\N	app	\N	302	347
1181	cde127be-019c-48c0-8881-8d71e241e423	12:00 AM	11:59 PM	f	\N	app	\N	302	1200
1182	22cd0e78-cfd8-4897-90dd-e266520aca2e	06:00 AM	10:00 AM	f	\N	app	\N	303	350
1183	6f803e14-cddd-48a2-8534-95b79c721929	10:00 AM	02:00 PM	f	\N	app	\N	303	350
1184	d320bcbe-b84b-47b8-8b92-a42c1260e4ff	02:00 PM	06:00 PM	f	\N	app	\N	303	350
1185	6e9afdd6-a49d-4809-a94d-f47ac04aef97	06:00 PM	10:00 PM	f	\N	app	\N	303	347
1186	6a7bbb27-5604-44be-97eb-d53436b0d013	12:00 AM	11:59 PM	f	\N	app	\N	303	1200
1187	bcb6ffb0-ff35-45e9-9214-5a92d93633b7	06:00 AM	10:00 AM	f	\N	app	\N	304	350
1188	d1a372a5-9f49-4aa5-9d29-31b46fb816e2	10:00 AM	02:00 PM	f	\N	app	\N	304	350
1189	5c194594-f4c1-40f7-893e-f715e2d620ce	02:00 PM	06:00 PM	f	\N	app	\N	304	350
1190	8feffaa3-154e-45a0-ac3f-d0930bd3f78b	06:00 PM	10:00 PM	f	\N	app	\N	304	347
1191	b6ace4ac-5a1b-47cf-a161-2686b7f6dd55	12:00 AM	11:59 PM	f	\N	app	\N	304	1200
1192	2cb0ed9c-ce3d-4e28-8b0d-009f0d7cdd23	06:00 AM	10:00 AM	f	\N	app	\N	305	350
1193	d28bf5f4-4168-47cb-90a8-fa8e9a3a9785	10:00 AM	02:00 PM	f	\N	app	\N	305	350
1194	6b7dbe60-5290-41c9-bf8f-acd8458b1ff1	02:00 PM	06:00 PM	f	\N	app	\N	305	350
1195	38f02179-35b3-472d-bf90-ce789a43dfc0	06:00 PM	10:00 PM	f	\N	app	\N	305	347
1196	207e804d-466d-402e-8ac3-a53d7450eb66	12:00 AM	11:59 PM	f	\N	app	\N	305	1200
1197	9799d418-5575-431b-bcc2-e4c31ffb1240	06:00 AM	10:00 AM	f	\N	app	\N	306	350
1198	91b22b41-9bab-4e7a-ac03-77a402f7700d	10:00 AM	02:00 PM	f	\N	app	\N	306	350
1199	34724a35-a527-4c19-b6c5-88cc9a47808a	02:00 PM	06:00 PM	f	\N	app	\N	306	350
1200	51fe8a22-464f-498c-8a71-3ac8245ce66b	06:00 PM	10:00 PM	f	\N	app	\N	306	347
1201	8be1cfc8-40bb-4de6-bd8c-668247da78a6	12:00 AM	11:59 PM	f	\N	app	\N	306	1200
1202	d5e1a391-a4c6-49bf-b546-44bbe3a597a1	06:00 AM	10:00 AM	f	\N	app	\N	307	350
1203	67d19c79-7d85-45f2-8fac-2665375fed83	10:00 AM	02:00 PM	f	\N	app	\N	307	350
1204	be04abf1-4680-4759-8780-415e7135e47f	02:00 PM	06:00 PM	f	\N	app	\N	307	350
1205	52571aea-968f-437f-a392-b5fa7168a09b	06:00 PM	10:00 PM	f	\N	app	\N	307	347
1206	5ad49e7b-8fff-47e5-8ad4-2a18e1e4c916	12:00 AM	11:59 PM	f	\N	app	\N	307	1200
1207	14cc8ab2-041c-4540-bf59-2933f0fcb088	06:00 AM	10:00 AM	f	\N	app	\N	308	350
1208	694d0c52-7e64-4550-a16e-c0b3947b4ce1	10:00 AM	02:00 PM	f	\N	app	\N	308	350
1209	2ef6a945-ad0b-4eec-a840-60776df70db5	02:00 PM	06:00 PM	f	\N	app	\N	308	350
1210	05725bb2-e777-44e6-9a5c-3d1fc009b8fc	06:00 PM	10:00 PM	f	\N	app	\N	308	350
1211	97e8cd2b-ce9b-421e-a098-6e7c1d69f37f	12:00 AM	11:59 PM	f	\N	app	\N	308	1200
1212	360a90fa-19b0-431b-9910-ffe5e58aef48	06:00 AM	10:00 AM	f	\N	app	\N	309	350
1213	275a10f2-3909-4fd6-952d-342b8cc9d894	10:00 AM	02:00 PM	f	\N	app	\N	309	350
1214	87b2e9e3-f6f9-4bd4-b727-72b87c57aedc	02:00 PM	06:00 PM	f	\N	app	\N	309	350
1215	91f7ea38-97d6-4b00-a068-7f1648416e01	06:00 PM	10:00 PM	f	\N	app	\N	309	350
1216	defacb61-853e-40f9-8488-e6067fc73746	12:00 AM	11:59 PM	f	\N	app	\N	309	1200
1217	583acd4c-5d0a-4ea7-90de-b85070062a77	06:00 AM	10:00 AM	f	\N	app	\N	310	350
1218	fdda2710-a3d2-43f0-b751-26bb9a4278dc	10:00 AM	02:00 PM	f	\N	app	\N	310	350
1219	f462071f-a18d-4d70-b2fe-c3f8f51c4dc1	02:00 PM	06:00 PM	f	\N	app	\N	310	350
1220	b156d0ea-e1a4-4055-bc95-cd24a8a08b8e	06:00 PM	10:00 PM	f	\N	app	\N	310	350
1221	1c3317a8-168d-4b8e-9f60-e79868fd19ea	12:00 AM	11:59 PM	f	\N	app	\N	310	1200
1222	50461e49-3cfd-412b-9b88-721a4ec4ad25	06:00 AM	10:00 AM	f	\N	app	\N	311	350
1223	3a571ade-42a1-4f6b-848b-9eae5545fe73	10:00 AM	02:00 PM	f	\N	app	\N	311	350
1224	a6d99ca9-82d7-42b1-ac06-6662923d7a58	02:00 PM	06:00 PM	f	\N	app	\N	311	350
1225	5c4e51a6-6789-4190-a9ec-0e90c4e545c6	06:00 PM	10:00 PM	f	\N	app	\N	311	350
1226	b3b94942-6591-42f4-acfa-1f84243a494e	12:00 AM	11:59 PM	f	\N	app	\N	311	1200
1227	1d3086c3-f81f-4169-97d7-2fdac683d36a	06:00 AM	10:00 AM	f	\N	app	\N	312	350
1228	96c0aafb-f5be-4431-914c-572ba3314f2b	10:00 AM	02:00 PM	f	\N	app	\N	312	350
1229	5f14748a-3f14-4a8e-a9a2-2b2a0a26d21c	02:00 PM	06:00 PM	f	\N	app	\N	312	350
1230	dad3920d-f1be-4c6c-a468-5b4599f323ea	06:00 PM	10:00 PM	f	\N	app	\N	312	350
1231	9c119beb-74bd-4549-b75c-55ee2e5b342e	12:00 AM	11:59 PM	f	\N	app	\N	312	1200
1232	3c5b61d3-a0a3-45db-afcc-6a781d500379	06:00 AM	10:00 AM	f	\N	app	\N	313	350
1233	d380291b-0ae2-4c2d-8775-d93e960f51e5	10:00 AM	02:00 PM	f	\N	app	\N	313	350
1234	452d3444-09f4-4888-824a-ed6100f2c862	02:00 PM	06:00 PM	f	\N	app	\N	313	350
1235	f3758178-df89-47f8-a216-f723cd822e11	06:00 PM	10:00 PM	f	\N	app	\N	313	350
1236	baabd492-5fb7-4b6c-9569-e99dcc663aa3	12:00 AM	11:59 PM	f	\N	app	\N	313	1200
1237	a5aa4578-35fd-465c-b62d-8c2777685218	06:00 AM	10:00 AM	f	\N	app	\N	314	350
1238	101de8c4-06bf-4450-8480-2a4647131eab	10:00 AM	02:00 PM	f	\N	app	\N	314	350
1239	5e7e881b-2425-4d63-bc70-23efacac176a	02:00 PM	06:00 PM	f	\N	app	\N	314	350
1240	846c2747-e300-49e3-9c24-e1695b429020	06:00 PM	10:00 PM	f	\N	app	\N	314	350
1241	8faad146-e1cd-40e0-a335-8e7dbfe8540f	12:00 AM	11:59 PM	f	\N	app	\N	314	1200
1242	dfb3f8e0-c07d-480a-a6aa-2f15a8a59e8b	06:00 AM	10:00 AM	f	\N	app	\N	315	350
1243	f9340fdb-1e2f-49e9-8cd3-36fd76a54765	10:00 AM	02:00 PM	f	\N	app	\N	315	350
1244	d985df04-ac24-4387-a114-14175ec2b81a	02:00 PM	06:00 PM	f	\N	app	\N	315	350
1245	743ebbb9-a0df-4a72-a8ea-4b452877bd8e	06:00 PM	10:00 PM	f	\N	app	\N	315	350
1246	1945024b-62dc-4338-b9ca-b321b509b686	12:00 AM	11:59 PM	f	\N	app	\N	315	1200
1247	eb046f42-39eb-4302-91df-fe50866fb045	06:00 AM	10:00 AM	f	\N	app	\N	316	350
1248	ac228cc1-c9ec-48a8-9583-61027f7a4ed2	10:00 AM	02:00 PM	f	\N	app	\N	316	350
1249	fc0485d7-b580-4332-b08a-3e032860c98f	02:00 PM	06:00 PM	f	\N	app	\N	316	350
1250	acc23933-ac00-4a31-bc6a-c48c739570fc	06:00 PM	10:00 PM	f	\N	app	\N	316	350
1251	905458d3-db0c-40a0-adf4-b598eb9cee1d	12:00 AM	11:59 PM	f	\N	app	\N	316	1200
1252	b72798fd-6b8a-4634-a255-b1985209e61d	06:00 AM	10:00 AM	f	\N	app	\N	317	350
1253	0e8f2e91-bcbf-4ad5-b8bf-40782bc31189	10:00 AM	02:00 PM	f	\N	app	\N	317	350
1254	65c1bb58-ad3b-414e-afb9-66795b0d2627	02:00 PM	06:00 PM	f	\N	app	\N	317	350
1255	da5f23bf-9fed-4a8f-8a01-8acfabfecfea	06:00 PM	10:00 PM	f	\N	app	\N	317	350
1256	7893c75b-a3da-45de-a0a3-e25a0bce4ced	12:00 AM	11:59 PM	f	\N	app	\N	317	1200
1257	0721f488-bc5c-42a2-be70-8fcabfd8293b	06:00 AM	10:00 AM	f	\N	app	\N	318	350
1258	3904a873-8ca8-4562-9fe8-2a9300a489b4	10:00 AM	02:00 PM	f	\N	app	\N	318	350
1259	d63887d9-89df-49bb-bc64-75b051e131fb	02:00 PM	06:00 PM	f	\N	app	\N	318	350
1260	814170e3-a80a-4f67-b482-dd85e0331715	06:00 PM	10:00 PM	f	\N	app	\N	318	350
1261	09afb726-c9fc-4b45-9b31-91ab9a9d673c	12:00 AM	11:59 PM	f	\N	app	\N	318	1200
1262	bb677162-c175-46a0-a9b0-03ce49d5162c	06:00 AM	10:00 AM	f	\N	app	\N	319	350
1263	c3e07d9f-e5ca-423f-987a-e82e3e14a906	10:00 AM	02:00 PM	f	\N	app	\N	319	350
1264	16e23f5d-9bc8-4739-9052-d097dc2edf4d	02:00 PM	06:00 PM	f	\N	app	\N	319	350
1265	c714db34-5109-4c30-8ce2-f2f156e1e2b1	06:00 PM	10:00 PM	f	\N	app	\N	319	350
1266	f6fa3085-5566-43b3-a30b-dd35a7e5dc3b	12:00 AM	11:59 PM	f	\N	app	\N	319	1200
1267	c15d3c6e-5ee7-4df9-8ab3-da21f1240383	06:00 AM	10:00 AM	f	\N	app	\N	320	350
1268	94b39313-a6c2-484b-be8b-603e36b19960	10:00 AM	02:00 PM	f	\N	app	\N	320	350
1269	7c27899c-87f9-4e30-a0ec-eea38818d1c4	02:00 PM	06:00 PM	f	\N	app	\N	320	350
1270	f2d667b6-674f-4526-8bb1-e1f8a9851569	06:00 PM	10:00 PM	f	\N	app	\N	320	350
1271	65cac8ae-2fb1-40da-9d12-5174608f1127	12:00 AM	11:59 PM	f	\N	app	\N	320	1200
1272	c8b58ef7-42b2-4d3e-91aa-d15828d26aa6	06:00 AM	10:00 AM	f	\N	app	\N	321	350
1273	2216369c-57ab-4c3a-a1d5-46afd26f2971	10:00 AM	02:00 PM	f	\N	app	\N	321	350
1274	b6730800-8a74-4702-9fe7-663a56345c92	02:00 PM	06:00 PM	f	\N	app	\N	321	350
1275	6e3378ce-843d-4d15-b02d-9a3704103f2d	06:00 PM	10:00 PM	f	\N	app	\N	321	350
1276	304b64d6-10d4-4cb5-a90c-08bd2f7ac902	12:00 AM	11:59 PM	f	\N	app	\N	321	1200
1277	2002e50a-bc24-4ac7-9c26-82031232fd67	06:00 AM	10:00 AM	f	\N	app	\N	322	350
1278	82af7c0b-0e51-4cd7-8745-4d9d4f6c7ad6	10:00 AM	02:00 PM	f	\N	app	\N	322	350
1279	3384740b-ee67-478c-bd9b-e90f692177c0	02:00 PM	06:00 PM	f	\N	app	\N	322	350
1280	19b79126-ee08-4ebe-bb42-a30828202263	06:00 PM	10:00 PM	f	\N	app	\N	322	350
1281	ce3ac4db-6c0a-492d-8d97-8f968f2fede1	12:00 AM	11:59 PM	f	\N	app	\N	322	1200
1282	cee42628-9810-4cc6-bba7-26427c2d39af	06:00 AM	10:00 AM	f	\N	app	\N	323	350
1283	77d31d7f-8013-4958-b25b-d83010a389bf	10:00 AM	02:00 PM	f	\N	app	\N	323	350
1284	ad8dbfe8-3cbf-41e9-b5c8-c7aa02743476	02:00 PM	06:00 PM	f	\N	app	\N	323	350
1285	f94c05df-881b-43be-ad8c-02f068c09696	06:00 PM	10:00 PM	f	\N	app	\N	323	350
1286	30d875cd-e2e4-44d9-8c53-b3a34e43792a	12:00 AM	11:59 PM	f	\N	app	\N	323	1200
1287	b014e78a-38ad-4d9b-9fc5-c33fe81614ee	06:00 AM	10:00 AM	f	\N	app	\N	324	350
1288	410b0427-e867-4b3f-9c52-f8960872a697	10:00 AM	02:00 PM	f	\N	app	\N	324	350
1289	df75156f-995f-426b-b1f5-9d151ddad771	02:00 PM	06:00 PM	f	\N	app	\N	324	350
1290	6c6f541f-dbca-47d1-8f90-c0c638373298	06:00 PM	10:00 PM	f	\N	app	\N	324	350
1291	8223bb4c-b6f1-4059-a953-f2455a258e04	12:00 AM	11:59 PM	f	\N	app	\N	324	1200
1292	54dc3a55-fbf4-490d-a443-bfe86abb73ea	06:00 AM	10:00 AM	f	\N	app	\N	325	350
1293	bb76993b-bcfe-443d-a86f-1aa7a16b092a	10:00 AM	02:00 PM	f	\N	app	\N	325	350
1294	31374228-f729-40ce-818e-4712b6573129	02:00 PM	06:00 PM	f	\N	app	\N	325	350
1295	78b3a5f8-0dad-4394-8608-0a0bc9ad95ad	06:00 PM	10:00 PM	f	\N	app	\N	325	350
1296	600573d6-77a4-449f-a668-cc9a13495797	12:00 AM	11:59 PM	f	\N	app	\N	325	1200
1297	f8d9eca5-7475-4c00-83cb-c101ea577985	06:00 AM	10:00 AM	f	\N	app	\N	326	350
1298	004abd07-2b99-4fd6-b41d-d1d790cc79a9	10:00 AM	02:00 PM	f	\N	app	\N	326	350
1299	cbb8fb2b-944e-472d-b7f1-d396932cc541	02:00 PM	06:00 PM	f	\N	app	\N	326	350
1300	45e858f8-277e-4854-81d4-f5e63927c93d	06:00 PM	10:00 PM	f	\N	app	\N	326	350
1301	d0e97a85-8a44-4f95-87a7-5fd2e3afe5ce	12:00 AM	11:59 PM	f	\N	app	\N	326	1200
1302	3b022b4e-e57a-41df-869b-af0eb0f83fe9	06:00 AM	10:00 AM	f	\N	app	\N	327	350
1303	c6d70411-c81c-4e13-8212-025916a78e18	10:00 AM	02:00 PM	f	\N	app	\N	327	350
1304	af1f398c-edb9-45de-b1ad-31f9b195cd7b	02:00 PM	06:00 PM	f	\N	app	\N	327	350
1305	de2ae5d4-b473-48fb-bbc1-f984980b62a0	06:00 PM	10:00 PM	f	\N	app	\N	327	350
1306	5e3e7dcb-0e6f-4c94-be23-424092363561	12:00 AM	11:59 PM	f	\N	app	\N	327	1200
1307	b1faf496-9a59-4fb7-ad7d-b97071d03f69	06:00 AM	10:00 AM	f	\N	app	\N	328	350
1308	030a30e2-2349-4261-903a-5cd847b04e20	10:00 AM	02:00 PM	f	\N	app	\N	328	350
1309	4dfb6e30-24ac-4b1b-ace5-e78eba873df3	02:00 PM	06:00 PM	f	\N	app	\N	328	350
1310	7f49c02b-7f16-427c-845a-1b945ac23b39	06:00 PM	10:00 PM	f	\N	app	\N	328	350
1311	63e01a81-285e-4f3c-bc39-74f050e57cc5	12:00 AM	11:59 PM	f	\N	app	\N	328	1200
1312	b8237b43-babf-48b4-a45e-b38bde0fa84a	06:00 AM	10:00 AM	f	\N	app	\N	329	350
1313	7ad6a41f-ec74-4b4c-803e-257675072c7e	10:00 AM	02:00 PM	f	\N	app	\N	329	350
1314	ae5d989d-593b-4b3e-a4c1-2b87e342e844	02:00 PM	06:00 PM	f	\N	app	\N	329	350
1315	cbc22eb8-5ace-4aea-b5f9-d1604408b2c0	06:00 PM	10:00 PM	f	\N	app	\N	329	350
1316	779da642-0e5b-4459-8820-9016e91d768f	12:00 AM	11:59 PM	f	\N	app	\N	329	1200
1317	847a508d-5c47-4c9c-9d3d-61a245c4a00c	06:00 AM	10:00 AM	f	\N	app	\N	330	350
1318	d2fd8d52-ae1b-4cf7-aad4-6fc45d77ab88	10:00 AM	02:00 PM	f	\N	app	\N	330	350
1319	bc9d9cbc-afea-43e0-9cf7-4840591ca12f	02:00 PM	06:00 PM	f	\N	app	\N	330	350
1320	d46c6849-345c-4279-933c-0a680aeadfc2	06:00 PM	10:00 PM	f	\N	app	\N	330	350
1321	a2915bfb-1fc6-446f-a1fb-42ab3085b3aa	12:00 AM	11:59 PM	f	\N	app	\N	330	1200
1322	6956dc0d-2309-4fbb-8e49-e3b5e1327532	06:00 AM	10:00 AM	f	\N	app	\N	331	350
1323	d7e898c0-c84d-439b-a81d-8bdd1ce567a2	10:00 AM	02:00 PM	f	\N	app	\N	331	350
1324	77bf3c1e-7cd2-435a-a50f-727cad721a7a	02:00 PM	06:00 PM	f	\N	app	\N	331	350
1325	bdeeb04d-f1ce-4a3a-96be-2d9b97f219fb	06:00 PM	10:00 PM	f	\N	app	\N	331	350
1326	fa13ca23-4515-4df5-ae40-b6df03f95b34	12:00 AM	11:59 PM	f	\N	app	\N	331	1200
1327	c6df37f2-312a-4f83-aa07-55a57e82ab65	06:00 AM	10:00 AM	f	\N	app	\N	332	350
1328	087e2372-8f16-44b1-96ad-fa201ead4e2c	10:00 AM	02:00 PM	f	\N	app	\N	332	350
1329	29744f72-f527-4c4f-abd7-e93b10649594	02:00 PM	06:00 PM	f	\N	app	\N	332	350
1330	dfb782b5-7c4e-4ea0-8103-558cd4a1348d	06:00 PM	10:00 PM	f	\N	app	\N	332	350
1331	cebda165-86ca-4c2f-8e91-19356dc652af	12:00 AM	11:59 PM	f	\N	app	\N	332	1200
1332	b24a7b30-8c7b-4b7c-a031-8a2948a559ec	06:00 AM	10:00 AM	f	\N	app	\N	333	350
1333	be3a5d0b-4009-4b1f-ba36-fa1e7843669e	10:00 AM	02:00 PM	f	\N	app	\N	333	350
1334	23adeb5a-3ce2-4e2a-97bc-a9033b524b1f	02:00 PM	06:00 PM	f	\N	app	\N	333	350
1335	aa80a3a7-9db2-46a1-90e2-31284991b957	06:00 PM	10:00 PM	f	\N	app	\N	333	350
1336	72a39e1d-6892-4e74-af8b-f83c06a180fc	12:00 AM	11:59 PM	f	\N	app	\N	333	1200
2811	bea7aa80-aa71-4036-9a54-44c612c8f68c	06:00 PM	10:00 PM	f	\N	app	\N	624	200
2812	310c75d3-26be-44d7-a294-ad5e507ff886	12:00 AM	11:59 PM	f	\N	app	\N	624	1000
2814	e878eed8-73ef-4950-aa96-20d9210808c1	06:00 AM	10:00 AM	f	\N	app	\N	625	200
2815	de8aa779-7791-4137-ad97-ad43c8f8a137	10:00 AM	02:00 PM	f	\N	app	\N	625	300
2816	0bf64c11-b542-4662-a811-887860bdf7c3	02:00 PM	06:00 PM	f	\N	app	\N	625	300
2817	f2151817-290a-4d7b-a00c-5589ac959f11	06:00 PM	10:00 PM	f	\N	app	\N	625	200
2818	5e618071-75f2-41b3-a9eb-41108d1158b2	12:00 AM	11:59 PM	f	\N	app	\N	625	1000
2820	188da86f-d1bf-4ca4-8bf4-a862dcbcc918	06:00 AM	10:00 AM	f	\N	app	\N	626	200
2821	f1cca373-0b3c-4fbc-87ea-4793a8fb1f93	10:00 AM	02:00 PM	f	\N	app	\N	626	300
2822	59b2eeb9-5fd9-4cdf-a8d9-2f4017556ecb	02:00 PM	06:00 PM	f	\N	app	\N	626	300
2823	2d7a7843-b572-4c7f-8aa0-8fb38a27c76d	06:00 PM	10:00 PM	f	\N	app	\N	626	200
2824	55dda68b-5cdd-467c-be8f-23e729846ba6	12:00 AM	11:59 PM	f	\N	app	\N	626	1000
2826	5525b820-46e3-43e7-b717-6b73a9ea10c6	06:00 AM	10:00 AM	f	\N	app	\N	627	200
2827	fe3d2838-5ccc-4489-8821-f4fc9dc7931e	10:00 AM	02:00 PM	f	\N	app	\N	627	300
2828	1b08dbc6-1205-4db8-8d40-8b54f8587178	02:00 PM	06:00 PM	f	\N	app	\N	627	300
2829	ec8195d7-3f36-459b-8332-8f6065f59713	06:00 PM	10:00 PM	f	\N	app	\N	627	200
2830	bf642df1-e825-4e35-8ba6-c1b9684bb838	12:00 AM	11:59 PM	f	\N	app	\N	627	1000
2832	43758037-9911-4e9d-88f2-c41c3cef9052	06:00 AM	10:00 AM	f	\N	app	\N	628	200
2833	4f0fc97b-6c76-4755-b4f6-627f067c5f84	10:00 AM	02:00 PM	f	\N	app	\N	628	300
2834	4d4410eb-4423-4c57-a06a-f77f34a3e17e	02:00 PM	06:00 PM	f	\N	app	\N	628	300
2835	90cb57f3-5737-4e6d-b6fd-d1926c180707	06:00 PM	10:00 PM	f	\N	app	\N	628	200
2836	09b35365-1d02-4741-8513-6685e3a0a80e	12:00 AM	11:59 PM	f	\N	app	\N	628	1000
2838	8ba84aff-ac54-4bb3-8e50-1034ff177cb4	06:00 AM	10:00 AM	f	\N	app	\N	629	200
2839	97fbf2cd-96a5-45d7-99ec-486a409044e3	10:00 AM	02:00 PM	f	\N	app	\N	629	300
2840	aadd7004-167a-49ff-94fb-ee2cf7ff82a2	02:00 PM	06:00 PM	f	\N	app	\N	629	300
1622	6671f0d3-6a5c-40db-9377-dc570133078d	06:00 AM	10:00 AM	f	\N	app	\N	391	250
1623	8be4f6a6-d4ea-467d-a37a-626069d98b88	10:00 AM	02:00 PM	f	\N	app	\N	391	300
1624	34ab768a-5b44-43b1-b0d9-066c64f4ba99	02:00 PM	06:00 PM	f	\N	app	\N	391	300
1625	32824f56-1111-4570-9ba0-7e56d5c4eba5	06:00 PM	10:00 PM	f	\N	app	\N	391	250
1626	b0bbf0cd-e36a-490e-8b3f-d6ccdecae603	12:00 AM	11:59 PM	f	\N	app	\N	391	800
1627	5e5db96b-f2cd-4544-99f3-fc44ba9563ce	06:00 AM	10:00 AM	f	\N	app	\N	392	250
1628	4ef0f8c6-7911-4a1f-9cac-36942a73eb18	10:00 AM	02:00 PM	f	\N	app	\N	392	300
1629	cafa8626-e33b-4c4e-a6c3-6f319c8f7ecf	02:00 PM	06:00 PM	f	\N	app	\N	392	300
1630	69d92925-5e54-42e1-a119-2072c00d87df	06:00 PM	10:00 PM	f	\N	app	\N	392	250
1631	98fa13fe-2fb0-4ffd-93ce-990417f0328d	12:00 AM	11:59 PM	f	\N	app	\N	392	800
1632	a6819101-1412-454f-981c-bf9e12060c38	06:00 AM	10:00 AM	f	\N	app	\N	393	250
1633	cd8dd7fe-b95e-4282-8864-4edfdba7c9ef	10:00 AM	02:00 PM	f	\N	app	\N	393	300
1634	2bde01bf-f8f4-4c32-bf35-5d64854cd309	02:00 PM	06:00 PM	f	\N	app	\N	393	300
1635	2434b385-f050-48e7-ba49-1c9a70f46cdc	06:00 PM	10:00 PM	f	\N	app	\N	393	250
1636	e2ed4c19-af77-4b38-88b7-e37aaa83f8e7	12:00 AM	11:59 PM	f	\N	app	\N	393	800
1637	805e6533-54ed-4113-8848-c15093cd2194	06:00 AM	10:00 AM	f	\N	app	\N	394	250
1638	8e0c866a-081e-4652-841e-c562ccc9d780	10:00 AM	02:00 PM	f	\N	app	\N	394	300
1639	27d63cc0-1438-463f-bb17-890f555733fc	02:00 PM	06:00 PM	f	\N	app	\N	394	300
1640	f68d7072-3d24-4f6f-b578-f7184e844feb	06:00 PM	10:00 PM	f	\N	app	\N	394	250
1641	6c01c1d3-aab8-4af3-b937-cce56677a136	12:00 AM	11:59 PM	f	\N	app	\N	394	800
1642	28efa181-82a1-4547-9e8a-029ffaa13a07	06:00 AM	10:00 AM	f	\N	app	\N	395	250
1643	977ee142-4c36-41fa-b1a9-2324bccd87c0	10:00 AM	02:00 PM	f	\N	app	\N	395	300
1644	affaf3a4-3c40-484a-ab5d-e7728ba1e073	02:00 PM	06:00 PM	f	\N	app	\N	395	300
1645	b40f1179-61a6-455e-bee0-439ac648c48d	06:00 PM	10:00 PM	f	\N	app	\N	395	250
1646	3942a496-a9e8-44c1-9995-56d9d28f028f	12:00 AM	11:59 PM	f	\N	app	\N	395	800
1647	56c36cf6-11ec-4de7-869c-98fa8f30f19c	06:00 AM	10:00 AM	f	\N	app	\N	396	250
1648	9a8afb03-6992-4369-b347-87f8827e8c9f	10:00 AM	02:00 PM	f	\N	app	\N	396	300
1649	faf63b74-31a4-4048-a883-aa6b4ffbcf47	02:00 PM	06:00 PM	f	\N	app	\N	396	300
1676	f697d8e6-b59b-455a-9b59-f1d05349330e	12:00 AM	11:59 PM	f	\N	app	\N	401	800
1677	2c4b2bad-7e75-4130-aabf-315a52b6a43a	06:00 AM	10:00 AM	f	\N	app	\N	402	250
1678	5f9dc472-19c8-4a52-bc44-8b70167242f2	10:00 AM	02:00 PM	f	\N	app	\N	402	300
1679	0aa4f04a-2663-44e6-871c-16ab53cdcb28	02:00 PM	06:00 PM	f	\N	app	\N	402	300
1680	1ca8c845-0bd2-4f9d-91be-c3d0bad27c58	06:00 PM	10:00 PM	f	\N	app	\N	402	250
1681	9994ecd8-51e2-4b74-9c76-76d8df3feae3	12:00 AM	11:59 PM	f	\N	app	\N	402	800
1682	cef1797f-21d2-4835-96b8-01084313e0db	06:00 AM	10:00 AM	f	\N	app	\N	403	250
1683	9bb7fb49-773c-4d8e-bf78-451f13d4d01f	10:00 AM	02:00 PM	f	\N	app	\N	403	300
1684	984b12bb-27aa-40b8-bcc0-b7347740b317	02:00 PM	06:00 PM	f	\N	app	\N	403	300
1685	8df903e7-5d84-4667-a105-856f83eddb33	06:00 PM	10:00 PM	f	\N	app	\N	403	250
1686	2ce16ca3-4937-44ca-a602-6d83fb86d02c	12:00 AM	11:59 PM	f	\N	app	\N	403	800
1687	78371923-8cb5-45f3-8f0c-26c6c07cab22	06:00 AM	10:00 AM	f	\N	app	\N	404	250
1688	6289d71d-8594-46a7-8d50-de49fffe1a40	10:00 AM	02:00 PM	f	\N	app	\N	404	300
1689	a8598c88-cb91-426f-acb7-53047a7d4e6c	02:00 PM	06:00 PM	f	\N	app	\N	404	300
1690	118dfd5f-b45e-4880-9515-df590b15a60f	06:00 PM	10:00 PM	f	\N	app	\N	404	250
1691	0c89b71d-a828-4a0b-b901-0e3eaa598295	12:00 AM	11:59 PM	f	\N	app	\N	404	800
1692	1cd9a568-eb0c-4b1f-98fd-cfa3e050eb92	06:00 AM	10:00 AM	f	\N	app	\N	405	250
1693	96337b64-497b-4733-9f8f-a18ee2a792b3	10:00 AM	02:00 PM	f	\N	app	\N	405	300
1694	cb0fa4f1-8867-4784-9351-d3bfa2d44243	02:00 PM	06:00 PM	f	\N	app	\N	405	300
1695	529be97b-6b4a-453d-bb02-15f581561bec	06:00 PM	10:00 PM	f	\N	app	\N	405	250
1696	28e150eb-779e-4934-963f-2aaab8466a9a	12:00 AM	11:59 PM	f	\N	app	\N	405	800
1697	0e3fb741-57dc-4d7c-b94c-10a0f69e7c42	06:00 AM	10:00 AM	f	\N	app	\N	406	250
1698	151a10f4-fe2b-44b7-80f3-b18fc892726f	10:00 AM	02:00 PM	f	\N	app	\N	406	300
1699	84118e2d-58bb-4974-8fe9-dd7559f907a4	02:00 PM	06:00 PM	f	\N	app	\N	406	300
1700	c5664ff7-2a52-4963-8b80-d8e1cc0a65be	06:00 PM	10:00 PM	f	\N	app	\N	406	250
1701	391faa6e-84d4-4b22-866c-34693f7e08de	12:00 AM	11:59 PM	f	\N	app	\N	406	800
1702	9e4d6110-4a48-4203-bdfe-ecaefc017fae	06:00 AM	10:00 AM	f	\N	app	\N	407	250
1703	0834f8fb-e79d-42db-98d1-c9ccf0b21a66	10:00 AM	02:00 PM	f	\N	app	\N	407	300
1704	d794dc47-14bd-4d25-89b2-c756fe32726e	02:00 PM	06:00 PM	f	\N	app	\N	407	300
1705	3eaab228-df6d-498c-a890-8f4108cca434	06:00 PM	10:00 PM	f	\N	app	\N	407	250
1706	02ff819c-5a38-45c8-a219-da80a5162c9e	12:00 AM	11:59 PM	f	\N	app	\N	407	800
1707	57935a94-7960-4aff-8827-3eec8318bc42	06:00 AM	10:00 AM	f	\N	app	\N	408	250
1708	eb61da01-3ef5-4b38-9552-d95a42e4ccd5	10:00 AM	02:00 PM	f	\N	app	\N	408	300
1709	47103fb6-a64c-4df6-967b-56bee4dfd414	02:00 PM	06:00 PM	f	\N	app	\N	408	300
1710	46c5190b-34bc-4491-b621-288c6263a01a	06:00 PM	10:00 PM	f	\N	app	\N	408	250
1711	4a814a85-5187-4b86-88d7-7a079bb2875c	12:00 AM	11:59 PM	f	\N	app	\N	408	800
1712	d60cbdfe-30a8-422b-b39c-9222a2b8639f	06:00 AM	10:00 AM	f	\N	app	\N	409	250
1713	2ee76a71-86d3-4f13-95d4-3654f64c9aa9	10:00 AM	02:00 PM	f	\N	app	\N	409	300
1714	6ced5581-2e9a-4cfc-bdb7-60b32979ce41	02:00 PM	06:00 PM	f	\N	app	\N	409	300
1715	55912d3f-2e1e-4e21-a814-6f411702c08e	06:00 PM	10:00 PM	f	\N	app	\N	409	250
1716	85279cab-5f36-4821-8f45-9ddde2cfaea9	12:00 AM	11:59 PM	f	\N	app	\N	409	800
1717	9a16ee96-2fb2-43bf-bba6-1542fc49c887	06:00 AM	10:00 AM	f	\N	app	\N	410	250
1718	9b4c85b6-48f9-4bb9-b19d-d2e817385599	10:00 AM	02:00 PM	f	\N	app	\N	410	300
1719	920b4e3e-4340-4ba7-9526-cd9063115f3b	02:00 PM	06:00 PM	f	\N	app	\N	410	300
1720	368ec289-0795-41b5-b42b-652edcd937a2	06:00 PM	10:00 PM	f	\N	app	\N	410	250
1721	19cc3dcd-6da4-4ede-a402-0b8ce52c391d	12:00 AM	11:59 PM	f	\N	app	\N	410	800
1722	d00a1528-cde0-4ecd-9848-645ce93eb1b0	06:00 AM	10:00 AM	f	\N	app	\N	411	250
1723	ea55c1a2-cb96-4432-8d29-ea605cfbd248	10:00 AM	02:00 PM	f	\N	app	\N	411	300
1724	3f96a1a0-ee9e-4ff4-8953-5be4e9e30906	02:00 PM	06:00 PM	f	\N	app	\N	411	300
1725	65f95ff4-71c1-4134-86ef-754797f7467e	06:00 PM	10:00 PM	f	\N	app	\N	411	250
1726	cda33136-2fd8-452c-8554-7812c4188502	12:00 AM	11:59 PM	f	\N	app	\N	411	800
1727	497a9bc2-cb72-40d9-ac24-d9a36e4e3107	06:00 AM	10:00 AM	f	\N	app	\N	412	250
1728	aa4e5f1a-37b4-4a29-95b2-8e7dea637716	10:00 AM	02:00 PM	f	\N	app	\N	412	300
1729	560dfc1c-55ce-4844-ade3-14c6cb1f4dff	02:00 PM	06:00 PM	f	\N	app	\N	412	300
1730	7165aca5-7717-4556-b3a6-96824780dc11	06:00 PM	10:00 PM	f	\N	app	\N	412	250
1731	9cacf99a-7efc-4332-92a7-2299b22f4aee	12:00 AM	11:59 PM	f	\N	app	\N	412	800
1732	01da6ab3-4bcd-43b8-8eee-869235e59058	06:00 AM	10:00 AM	f	\N	app	\N	413	250
1733	004d1307-7549-4533-b2ee-00a112892fec	10:00 AM	02:00 PM	f	\N	app	\N	413	300
1734	6f735e04-bcdc-4571-bb25-3e65e1141a56	02:00 PM	06:00 PM	f	\N	app	\N	413	300
1735	e48e42a9-6a49-4311-9e5e-f00fe2101f73	06:00 PM	10:00 PM	f	\N	app	\N	413	250
1736	28dbecc6-2730-4ab3-8ee2-4b82a1045ab2	12:00 AM	11:59 PM	f	\N	app	\N	413	800
1737	61813f95-2608-432d-8180-16854844ed74	06:00 AM	10:00 AM	f	\N	app	\N	414	250
1738	5c3c9cc7-7606-4dec-bb4e-78b3c2c45c63	10:00 AM	02:00 PM	f	\N	app	\N	414	300
1739	158797e6-675b-4b31-a159-cdbc4d95cede	02:00 PM	06:00 PM	f	\N	app	\N	414	300
1740	b2d9c9c5-e5f9-4e4f-8618-47dbb0b9fd1c	06:00 PM	10:00 PM	f	\N	app	\N	414	250
1741	7fc78e0b-52ac-4371-a668-3a53a4d40122	12:00 AM	11:59 PM	f	\N	app	\N	414	800
1742	5c7416bc-ccdf-462e-a994-ec1530abb41a	06:00 AM	10:00 AM	f	\N	app	\N	415	250
1743	8ded0f50-9806-47f8-85f9-b17ced57060e	10:00 AM	02:00 PM	f	\N	app	\N	415	300
1744	64db098f-7daa-4227-83bc-b87060b816b4	02:00 PM	06:00 PM	f	\N	app	\N	415	300
1745	b6c48e5c-49f0-4058-a969-6b8092ad55df	06:00 PM	10:00 PM	f	\N	app	\N	415	250
1746	3f47e7b5-bc9c-4644-92b3-380552b8d3da	12:00 AM	11:59 PM	f	\N	app	\N	415	800
1747	62f8e45a-91d2-4d9d-a8e0-4706dda646ee	06:00 AM	10:00 AM	f	\N	app	\N	416	250
1748	64f52d86-311c-48ee-9464-9d1a34f35d18	10:00 AM	02:00 PM	f	\N	app	\N	416	300
1749	1d022533-7324-4704-b715-1339981675e6	02:00 PM	06:00 PM	f	\N	app	\N	416	300
1750	38432861-eac5-4603-9639-e2170f47522c	06:00 PM	10:00 PM	f	\N	app	\N	416	250
1751	f71cb1d9-c04b-4cfb-aae1-0621051ffa21	12:00 AM	11:59 PM	f	\N	app	\N	416	800
1752	cea35009-a64f-4dca-a9d0-f7c9b4a30af9	06:00 AM	10:00 AM	f	\N	app	\N	417	250
1753	6563a192-2a1e-4896-9630-592c4af44c4c	10:00 AM	02:00 PM	f	\N	app	\N	417	300
1754	97adfb60-1191-45ba-968b-54e839bb6c7f	02:00 PM	06:00 PM	f	\N	app	\N	417	300
1755	7a835c90-88ae-4b2a-a1d2-09bdde2a5a27	06:00 PM	10:00 PM	f	\N	app	\N	417	250
1756	89bf0531-81fb-44c5-b8bc-58e8ce5e2630	12:00 AM	11:59 PM	f	\N	app	\N	417	800
1757	93ab01c3-ea10-4ab1-853a-1fbad1eabc1b	06:00 AM	10:00 AM	f	\N	app	\N	418	250
1758	79fc06b2-c42f-4d25-b611-e1576c9a6539	10:00 AM	02:00 PM	f	\N	app	\N	418	300
1759	7ead9cc7-28cd-4bad-ae4f-998863bed413	02:00 PM	06:00 PM	f	\N	app	\N	418	300
1760	0e222a34-79ee-4fc0-ba53-07bef0ea454d	06:00 PM	10:00 PM	f	\N	app	\N	418	250
1761	7007748f-3987-4074-b3d9-431eba4b192e	12:00 AM	11:59 PM	f	\N	app	\N	418	800
1762	fc03392c-9f72-46de-be88-a63fa06c648a	06:00 AM	10:00 AM	f	\N	app	\N	419	250
1763	9752fa6a-ac5f-4231-992c-5c6702ad2f28	10:00 AM	02:00 PM	f	\N	app	\N	419	300
1764	9b504d73-a15f-4753-8921-1ab59b15cc6a	02:00 PM	06:00 PM	f	\N	app	\N	419	300
1765	0891769e-9a05-48f7-ad75-516bff6b57e2	06:00 PM	10:00 PM	f	\N	app	\N	419	250
1766	3a6f3c66-eb0a-4a48-8f1e-b7d44a137eca	12:00 AM	11:59 PM	f	\N	app	\N	419	800
1767	fe8ce0ab-fb8b-4994-8269-0f4c3b0535af	06:00 AM	10:00 AM	f	\N	app	\N	420	250
1768	ff26b0a4-bb21-4bf3-bb9a-e6c977a11730	10:00 AM	02:00 PM	f	\N	app	\N	420	300
1769	cf8530c2-c3c3-484f-ad73-574c590a68f3	02:00 PM	06:00 PM	f	\N	app	\N	420	300
1770	98464b20-e1cc-47cb-a43a-358ad4a8cb70	06:00 PM	10:00 PM	f	\N	app	\N	420	250
1771	b716e456-518e-400d-b892-3e43c92e237c	12:00 AM	11:59 PM	f	\N	app	\N	420	800
1772	d7a984ef-27d2-4242-aef4-f0c33c735447	06:00 AM	10:00 AM	f	\N	app	\N	421	250
1773	40b8e3e1-2974-497b-93c2-adc25af5177d	10:00 AM	02:00 PM	f	\N	app	\N	421	300
1774	b8d8b7dc-bc59-4600-9981-42a7bb7f905c	02:00 PM	06:00 PM	f	\N	app	\N	421	300
1775	1b990db0-d937-48b3-907b-5a3fc7416f85	06:00 PM	10:00 PM	f	\N	app	\N	421	250
1776	612cb327-2c93-4ab4-b74d-437dd9014407	12:00 AM	11:59 PM	f	\N	app	\N	421	800
1777	6e507da9-db68-4e5b-a287-44851396e59b	06:00 AM	10:00 AM	f	\N	app	\N	422	250
1778	ee4c0ca8-4e32-4020-9812-b94217df4c39	10:00 AM	02:00 PM	f	\N	app	\N	422	300
1779	f0ccc6ce-fe9f-40fa-b9f6-02245425d376	02:00 PM	06:00 PM	f	\N	app	\N	422	300
1780	e62a72af-a3d8-4017-958e-d07660cb0ef6	06:00 PM	10:00 PM	f	\N	app	\N	422	250
1781	847ef08a-347c-402c-b471-9017b48fd167	12:00 AM	11:59 PM	f	\N	app	\N	422	800
1782	5244a715-5691-4f28-ba72-4955e3cd0d77	06:00 AM	10:00 AM	f	\N	app	\N	423	250
1783	cf2ecf8d-05bf-41f4-8444-ef291e189152	10:00 AM	02:00 PM	f	\N	app	\N	423	300
1784	af85db99-ec10-41ed-91ca-d4e1a5f1b4f8	02:00 PM	06:00 PM	f	\N	app	\N	423	300
1785	d5e5a9ee-b86b-42c5-92b9-dc8419d1ad69	06:00 PM	10:00 PM	f	\N	app	\N	423	250
1786	b17b85db-ec3b-41f4-97b6-bc3d79e5bec0	12:00 AM	11:59 PM	f	\N	app	\N	423	800
1787	c2ffde33-00b8-4971-876a-48a2189d9018	06:00 AM	10:00 AM	f	\N	app	\N	424	250
1788	b5ebf90a-0036-4265-a62f-5e354b4d60cb	10:00 AM	02:00 PM	f	\N	app	\N	424	300
1789	1f9ae694-a615-4f35-ab8b-0a962d42c9fc	02:00 PM	06:00 PM	f	\N	app	\N	424	300
1790	63d7d0b3-1311-4cd5-8f5e-ef4057ec699f	06:00 PM	10:00 PM	f	\N	app	\N	424	250
1791	281d5e15-d68f-48ed-8938-990e498e6428	12:00 AM	11:59 PM	f	\N	app	\N	424	800
1792	03654ab2-d51d-4a7c-a661-ed1b577a5bcc	06:00 AM	10:00 AM	f	\N	app	\N	425	250
1793	1c781b01-3b55-4a6c-bdc9-c2f7f8770e16	10:00 AM	02:00 PM	f	\N	app	\N	425	300
1794	96ed42d6-7333-4e62-a4ce-6eabaca7bac0	02:00 PM	06:00 PM	f	\N	app	\N	425	300
1795	3e2e2707-f23f-4f2b-8d6d-cfae37c395c5	06:00 PM	10:00 PM	f	\N	app	\N	425	250
1796	dd5d626d-75ca-4726-981a-2b41d4861121	12:00 AM	11:59 PM	f	\N	app	\N	425	800
1797	40053a82-fc97-4dc3-aea5-70620e16b762	06:00 AM	10:00 AM	f	\N	app	\N	426	250
1798	e264f247-1072-4bb3-b259-4c1cc1977f5f	10:00 AM	02:00 PM	f	\N	app	\N	426	300
1799	09694a17-8373-4ee5-8c7f-e57956978e41	02:00 PM	06:00 PM	f	\N	app	\N	426	300
1800	eed90093-cba5-457a-a0ae-47b874293ffb	06:00 PM	10:00 PM	f	\N	app	\N	426	250
1801	dd7619f2-388c-4263-b697-3a72eaa55f03	12:00 AM	11:59 PM	f	\N	app	\N	426	800
1802	340b77ab-8f4f-44aa-80f5-1e0a5f72e998	06:00 AM	10:00 AM	f	\N	app	\N	427	250
1803	dccffeba-c346-48dd-a1f1-b5080d5cf298	10:00 AM	02:00 PM	f	\N	app	\N	427	300
1804	8c155b74-fbdd-4c11-a754-6e0e14a45db2	02:00 PM	06:00 PM	f	\N	app	\N	427	300
1805	a7a05a62-4a42-488e-8c36-010c018bb6d1	06:00 PM	10:00 PM	f	\N	app	\N	427	250
1806	5d6c790e-f17e-49e6-bebd-288aba2bfabe	12:00 AM	11:59 PM	f	\N	app	\N	427	800
1807	4356a368-ae63-4802-8eff-8daeb326b277	06:00 AM	10:00 AM	f	\N	app	\N	428	250
1808	30e48611-89a6-4a88-8add-86e77e8e50c7	10:00 AM	02:00 PM	f	\N	app	\N	428	300
1809	cc49c635-1f00-413d-ada7-097dc8a49875	02:00 PM	06:00 PM	f	\N	app	\N	428	300
1810	1f626aa1-37a4-4718-a4a8-999625acaddd	06:00 PM	10:00 PM	f	\N	app	\N	428	250
1811	9fb8588a-1ce5-4ad6-a8f7-550887c4b141	12:00 AM	11:59 PM	f	\N	app	\N	428	800
1812	803cb644-61a4-41fa-8026-e3f6ab574ead	06:00 AM	10:00 AM	f	\N	app	\N	429	250
1813	14f1b975-a70e-4945-b308-667794c032d7	10:00 AM	02:00 PM	f	\N	app	\N	429	300
1814	86ec7e5c-d498-4c3f-a56b-034e4285d0b5	02:00 PM	06:00 PM	f	\N	app	\N	429	300
1815	d3f3f2f2-4909-4d6d-90e0-ea62c22c159b	06:00 PM	10:00 PM	f	\N	app	\N	429	250
1816	7e15f3f8-bafc-4216-9c49-b0203f421c82	12:00 AM	11:59 PM	f	\N	app	\N	429	800
1817	37cf7cac-a7f4-4f29-8fe5-fdb259aef801	06:00 AM	10:00 AM	f	\N	app	\N	430	250
1818	900d3888-732e-42f9-81f4-cb5cda6990c2	10:00 AM	02:00 PM	f	\N	app	\N	430	300
1819	3f2f949a-26a7-47a5-b715-5939f6ea578d	02:00 PM	06:00 PM	f	\N	app	\N	430	300
1820	a0717d19-7e31-40b1-ac14-d906b2eb9a3d	06:00 PM	10:00 PM	f	\N	app	\N	430	250
1821	48917a11-7416-4c13-9338-434fc4fcad49	12:00 AM	11:59 PM	f	\N	app	\N	430	800
1822	53e51db5-df8e-4320-a462-b4bb80e7be15	06:00 AM	10:00 AM	f	\N	app	\N	431	250
1823	84f2a035-a8b6-437a-8be5-1d793ec864ed	10:00 AM	02:00 PM	f	\N	app	\N	431	300
1824	ce25abb7-a567-4e6f-97c4-ec72ea8f3c55	02:00 PM	06:00 PM	f	\N	app	\N	431	300
1825	5499cd40-815a-406c-9a1b-6c7cd77b0fca	06:00 PM	10:00 PM	f	\N	app	\N	431	250
1826	beae40b1-be11-4dc4-8d33-00674be4f19e	12:00 AM	11:59 PM	f	\N	app	\N	431	800
1827	10bd4b0a-8326-4c55-ab72-5ca155a47f95	06:00 AM	10:00 AM	f	\N	app	\N	432	250
1828	38ebdd08-2465-4758-a5d0-c3a24c547119	10:00 AM	02:00 PM	f	\N	app	\N	432	300
1829	79c5dbf1-6ded-4042-9086-b0be10436220	02:00 PM	06:00 PM	f	\N	app	\N	432	300
1830	c84f2e01-19d0-4625-81dd-c8e085d9bab5	06:00 PM	10:00 PM	f	\N	app	\N	432	250
1831	be6abbd9-f72e-493a-bde7-2ce2187bf21c	12:00 AM	11:59 PM	f	\N	app	\N	432	800
1832	fefc6be6-ac1d-4106-ac7f-21f02eabea00	06:00 AM	10:00 AM	f	\N	app	\N	433	250
1833	569d32d4-623d-48d1-801e-a1787c5116df	10:00 AM	02:00 PM	f	\N	app	\N	433	300
1834	cb4a0d9e-1aa3-4c0d-9e39-3774d37a9abe	02:00 PM	06:00 PM	f	\N	app	\N	433	300
1835	5f09975f-f63f-4893-b044-573999dc066c	06:00 PM	10:00 PM	f	\N	app	\N	433	250
1836	1a9c6385-e39a-4701-8cc4-833ad31282c6	12:00 AM	11:59 PM	f	\N	app	\N	433	800
1837	387cade0-3531-44b6-94cd-e06da65d161b	06:00 AM	10:00 AM	f	\N	app	\N	434	250
1838	b78ee931-7722-4b9d-aaf9-6ca301e3d4ce	10:00 AM	02:00 PM	f	\N	app	\N	434	300
1839	6eaea8f4-b80b-49a9-afaa-59f534777304	02:00 PM	06:00 PM	f	\N	app	\N	434	300
1840	a170ba10-91f2-4ac6-914b-755cb1a6c3e7	06:00 PM	10:00 PM	f	\N	app	\N	434	250
1841	2117362b-234a-412d-8a99-ad3b1b4066d0	12:00 AM	11:59 PM	f	\N	app	\N	434	800
1842	364aab0f-9814-4a0d-996d-726696464318	06:00 AM	10:00 AM	f	\N	app	\N	435	250
1843	1ff9280b-6aa3-427a-be00-f06f35140430	10:00 AM	02:00 PM	f	\N	app	\N	435	300
1844	0e1428f3-ede4-4ed4-9ac4-b3720760dbe4	02:00 PM	06:00 PM	f	\N	app	\N	435	300
1845	a2bbf9d0-e0ad-443b-870e-da5756b89d57	06:00 PM	10:00 PM	f	\N	app	\N	435	250
1846	77791356-7313-4b31-855e-48c480e35074	12:00 AM	11:59 PM	f	\N	app	\N	435	800
1847	55ffd156-7647-4504-9e1c-8b42ab4c0de5	06:00 AM	10:00 AM	f	\N	app	\N	436	250
1848	a018ae9e-25b5-4b94-b247-d53b9c798588	10:00 AM	02:00 PM	f	\N	app	\N	436	300
1849	a26ee94b-1651-4e01-850a-7721b8642dd1	02:00 PM	06:00 PM	f	\N	app	\N	436	300
1850	fee26aca-4b41-4cd2-b00a-ef679e5f3c36	06:00 PM	10:00 PM	f	\N	app	\N	436	250
1851	d8ac1719-ad9f-45c5-bd33-13add23d6902	12:00 AM	11:59 PM	f	\N	app	\N	436	800
1852	66ba62db-9a58-49a1-a9d5-9c2686de0218	06:00 AM	10:00 AM	f	\N	app	\N	437	250
1853	abb8aa9d-d461-40c4-a376-0e24d03591e1	10:00 AM	02:00 PM	f	\N	app	\N	437	300
1854	5e0260df-bbdf-464e-b74e-e81a182723ff	02:00 PM	06:00 PM	f	\N	app	\N	437	300
1855	e09584af-7f55-4452-8a82-dcaa651abae0	06:00 PM	10:00 PM	f	\N	app	\N	437	250
1856	f3d4ce45-4a10-414e-bee4-5bedfd965c57	12:00 AM	11:59 PM	f	\N	app	\N	437	800
1857	8a70fdf9-f4be-4439-a947-56305a67bedd	06:00 AM	10:00 AM	f	\N	app	\N	438	250
1858	2dd823b7-96d1-4314-90f9-632c8e211b69	10:00 AM	02:00 PM	f	\N	app	\N	438	300
1859	8d518bc5-79c0-4265-a721-3047c25d4038	02:00 PM	06:00 PM	f	\N	app	\N	438	300
1860	5b56f79e-ae44-46d1-9ba4-b9599cb4a1c5	06:00 PM	10:00 PM	f	\N	app	\N	438	250
1861	d0891ed6-ee68-4467-a678-56eb9d441691	12:00 AM	11:59 PM	f	\N	app	\N	438	800
1862	c15917d3-0b77-4655-b690-acf19a21fe8b	06:00 AM	10:00 AM	f	\N	app	\N	439	250
1863	8d04dfe3-0952-418d-81a0-375dabbe4978	10:00 AM	02:00 PM	f	\N	app	\N	439	300
1864	54c29914-8240-41e6-8d69-558c000b14cd	02:00 PM	06:00 PM	f	\N	app	\N	439	300
1865	e67553bc-83c7-4eec-98a6-12c4dc8d12ca	06:00 PM	10:00 PM	f	\N	app	\N	439	250
1866	b09b9796-f77d-49c8-bc8c-597c49eaf51f	12:00 AM	11:59 PM	f	\N	app	\N	439	800
1867	cb3bb932-b0dd-4853-aafe-f2c7020a9479	06:00 AM	10:00 AM	f	\N	app	\N	440	250
1868	5eb847ff-ba7b-4c63-b888-f3198eb081d9	10:00 AM	02:00 PM	f	\N	app	\N	440	300
1869	838d6142-f397-4180-99b4-ddc7f1c29d40	02:00 PM	06:00 PM	f	\N	app	\N	440	300
1870	ce7f435d-e3d7-4d94-9d02-6b58353769a3	06:00 PM	10:00 PM	f	\N	app	\N	440	250
1871	822d8f43-be47-4e38-bf62-441a2f8e459f	12:00 AM	11:59 PM	f	\N	app	\N	440	800
1872	d919a3b4-d058-4014-bac0-26e559268f8c	06:00 AM	10:00 AM	f	\N	app	\N	441	250
1873	4cfd43e6-4dfb-45ce-804f-1dd86d2a9395	10:00 AM	02:00 PM	f	\N	app	\N	441	300
1874	c869fd63-9891-4f04-a079-e9847fc61996	02:00 PM	06:00 PM	f	\N	app	\N	441	300
1875	38d11f68-0516-4c7c-a4df-350a69147478	06:00 PM	10:00 PM	f	\N	app	\N	441	250
1876	38518ff5-6bb1-40f3-a296-2a3ec0ac0e4f	12:00 AM	11:59 PM	f	\N	app	\N	441	800
1877	d5c3a1ab-88c9-4ad5-a21d-2d7c9cd4865d	06:00 AM	10:00 AM	f	\N	app	\N	442	250
1878	5050ee9d-169e-49bb-827d-a10e64edf2cf	10:00 AM	02:00 PM	f	\N	app	\N	442	300
1879	c361281c-0328-490d-acf4-e39af7c1dad4	02:00 PM	06:00 PM	f	\N	app	\N	442	300
1880	b65c66ad-e7e7-460d-8fa3-34477193bb71	06:00 PM	10:00 PM	f	\N	app	\N	442	250
1881	8097d680-fb20-4db0-9822-bf5ad8afa2d2	12:00 AM	11:59 PM	f	\N	app	\N	442	800
1882	0e0904e2-8d84-4c4a-8fa1-8aa50e3d8fef	06:00 AM	10:00 AM	f	\N	app	\N	443	250
1883	2be6c831-0e09-4cc7-8487-749e96a85efa	10:00 AM	02:00 PM	f	\N	app	\N	443	300
1884	2757df8a-0e8e-4088-8247-036496ca98cb	02:00 PM	06:00 PM	f	\N	app	\N	443	300
1885	ddedd491-3c84-4cda-a1c1-06a005c7b287	06:00 PM	10:00 PM	f	\N	app	\N	443	250
1886	c3aaa71d-ed49-4ac2-a2c6-f4e2a0d5c992	12:00 AM	11:59 PM	f	\N	app	\N	443	800
1887	ac3b5aaa-4090-4f49-a7c4-5c26f890d934	06:00 AM	10:00 AM	f	\N	app	\N	444	250
1888	2317cc0a-c3bb-40da-8f55-e19b3240b7d6	10:00 AM	02:00 PM	f	\N	app	\N	444	300
1889	d0071f6f-4c23-469f-8408-a24c74809acf	02:00 PM	06:00 PM	f	\N	app	\N	444	300
1890	ec8d37c7-5728-43e6-8a43-e8da1b294e84	06:00 PM	10:00 PM	f	\N	app	\N	444	250
1891	de5b30e2-ee00-44ce-b535-05e66afe32cf	12:00 AM	11:59 PM	f	\N	app	\N	444	800
1892	79cb3257-7fa9-4f3f-9042-6db2c65da31e	06:00 AM	10:00 AM	f	\N	app	\N	445	250
1893	42a3a5b2-459e-4fe2-8c60-965dec2a183d	10:00 AM	02:00 PM	f	\N	app	\N	445	300
1894	a6030072-d4e1-4e54-8c28-0f708e74beee	02:00 PM	06:00 PM	f	\N	app	\N	445	300
1895	74c87498-2076-4b4a-8f9b-23d53c0ac9c3	06:00 PM	10:00 PM	f	\N	app	\N	445	250
1896	e672e96a-b4fd-444e-b400-f538032f2c51	12:00 AM	11:59 PM	f	\N	app	\N	445	800
1897	833ecaec-ed98-4406-b409-8e25c4c70ec6	06:00 AM	10:00 AM	f	\N	app	\N	446	250
1898	21d63fba-2aa0-4c31-a38b-be340f247388	10:00 AM	02:00 PM	f	\N	app	\N	446	300
1899	f505ca07-397b-4d79-bfbd-a33df1556cce	02:00 PM	06:00 PM	f	\N	app	\N	446	300
1900	efa1a502-60c8-453a-9de9-6f3a3d8efc7e	06:00 PM	10:00 PM	f	\N	app	\N	446	250
1901	3d3a66db-a59d-4cce-9486-77bb5a03c55a	12:00 AM	11:59 PM	f	\N	app	\N	446	800
1902	7b1424ca-e633-423c-939b-3432468f52df	06:00 AM	10:00 AM	f	\N	app	\N	447	250
1903	71545645-5e4b-4147-b2dc-b42d53c562bb	10:00 AM	02:00 PM	f	\N	app	\N	447	300
1904	f4ab2703-968d-4a29-b2db-b622f0f5f245	02:00 PM	06:00 PM	f	\N	app	\N	447	300
1905	c4169275-4584-46be-a734-2cd90a391f48	06:00 PM	10:00 PM	f	\N	app	\N	447	250
1906	f8a3499a-9900-4a36-9a8b-a71b8b630f61	12:00 AM	11:59 PM	f	\N	app	\N	447	800
1907	87773944-f593-4bc3-abcd-d98032d64794	06:00 AM	10:00 AM	f	\N	app	\N	448	250
1908	9e3cc368-77e9-4105-93eb-2ed6b39f5864	10:00 AM	02:00 PM	f	\N	app	\N	448	300
1909	2286b8f5-147b-4872-ad9f-2e80c73c37f9	02:00 PM	06:00 PM	f	\N	app	\N	448	300
1910	cbc65680-a8ae-450d-b61c-9743b04bf56f	06:00 PM	10:00 PM	f	\N	app	\N	448	250
1911	9dbfa0bb-cf81-4f58-8ee1-191e4a0887ce	12:00 AM	11:59 PM	f	\N	app	\N	448	800
1912	e2a56c30-a4d4-4668-b36c-90e3e74f59d4	06:00 AM	10:00 AM	f	\N	app	\N	449	250
1913	c840e9a1-86b3-45df-bd59-70c727ff83af	10:00 AM	02:00 PM	f	\N	app	\N	449	300
1914	a04dd8a6-845c-4683-9b43-0669d23fbcb6	02:00 PM	06:00 PM	f	\N	app	\N	449	300
1915	f71b6a4e-9379-4512-8257-bae4d222a8bc	06:00 PM	10:00 PM	f	\N	app	\N	449	250
1916	b9f9a88f-e35a-4b76-bb71-fc53a78e44aa	12:00 AM	11:59 PM	f	\N	app	\N	449	800
1917	78645a92-f4a3-453f-b601-cf1eb1c5d8f2	06:00 AM	10:00 AM	f	\N	app	\N	450	250
1918	39068c30-8210-4af5-9050-fbf58e396fe0	10:00 AM	02:00 PM	f	\N	app	\N	450	300
1919	ca247079-7f8d-49b9-8576-f74a3f20adfc	02:00 PM	06:00 PM	f	\N	app	\N	450	300
1920	c7d39b24-dc76-4dbd-9861-b95fd48184fb	06:00 PM	10:00 PM	f	\N	app	\N	450	250
1921	f68aa185-c5f3-4dc1-ab8b-257ffe44444c	12:00 AM	11:59 PM	f	\N	app	\N	450	800
1922	617f35c2-7e5f-414b-bc3f-231ef97aa9b3	06:00 AM	10:00 AM	f	\N	app	\N	451	250
1923	83340e1c-bf2b-4a33-9994-9bf635dda0b1	10:00 AM	02:00 PM	f	\N	app	\N	451	300
1924	f897727a-f158-426e-80b7-93af63e0b356	02:00 PM	06:00 PM	f	\N	app	\N	451	300
1925	0e3d35f3-bc90-481f-ab19-2da57055b5df	06:00 PM	10:00 PM	f	\N	app	\N	451	250
1926	f2872bbd-deb9-422c-b8ad-6132d4d19df8	12:00 AM	11:59 PM	f	\N	app	\N	451	800
1927	448bdd5c-bc83-4dba-8b6a-9bc669881a1e	06:00 AM	10:00 AM	f	\N	app	\N	452	250
1928	b0df8af0-7e66-4e6e-b426-80b08face37f	10:00 AM	02:00 PM	f	\N	app	\N	452	300
1929	18b98192-9969-47f1-9333-701793e39a41	02:00 PM	06:00 PM	f	\N	app	\N	452	300
1930	06729f12-fa7f-403b-9e91-4de5fb259805	06:00 PM	10:00 PM	f	\N	app	\N	452	250
1931	d9bd8ab4-c128-45dd-af1c-f7f27fa4a7fe	12:00 AM	11:59 PM	f	\N	app	\N	452	800
1932	b4893510-c4d6-480a-b434-43fce518908f	06:00 AM	10:00 AM	f	\N	app	\N	453	250
1933	889b8184-679d-42ba-b1ed-9fa4fbe83bbe	10:00 AM	02:00 PM	f	\N	app	\N	453	300
1934	6103f115-5da3-445c-ab4d-8f45ca9e9ef1	02:00 PM	06:00 PM	f	\N	app	\N	453	300
1935	6895539e-376d-479f-86fe-c055bd9afae0	06:00 PM	10:00 PM	f	\N	app	\N	453	250
1936	0e444c1c-2a56-4cd3-8af6-a8df8a221246	12:00 AM	11:59 PM	f	\N	app	\N	453	800
1937	41fb2684-a13d-4954-a42e-cd84da16d81d	06:00 AM	10:00 AM	f	\N	app	\N	454	250
1938	79dd7988-60f5-476f-b8b1-cb14b18bb236	10:00 AM	02:00 PM	f	\N	app	\N	454	300
1939	82ad8904-5800-495f-852a-e41a48c2da0a	02:00 PM	06:00 PM	f	\N	app	\N	454	300
1940	95aa39b8-a962-4bf4-944c-73c7836553d7	06:00 PM	10:00 PM	f	\N	app	\N	454	250
1941	90ced1f5-bd1f-4084-8d68-ce0aedaa12a6	12:00 AM	11:59 PM	f	\N	app	\N	454	800
1942	0443f66e-6e8a-4e09-b69f-5ccc679cf24b	06:00 AM	10:00 AM	f	\N	app	\N	455	250
1943	972a8692-0613-4c28-8893-53cf4ea1c64f	10:00 AM	02:00 PM	f	\N	app	\N	455	300
1944	0a5a2cc0-e905-48c4-809d-1e56a89e3d71	02:00 PM	06:00 PM	f	\N	app	\N	455	300
1945	2eb1e470-cfd3-4dc4-bcb2-27f06d92d0cc	06:00 PM	10:00 PM	f	\N	app	\N	455	250
1946	788e3f94-42d1-4cb5-88e1-a72f1e32fd9d	12:00 AM	11:59 PM	f	\N	app	\N	455	800
1947	fe1a2325-bfc8-43d1-9eef-ccacdb2c8821	06:00 AM	10:00 AM	f	\N	app	\N	456	250
1948	32fb1aef-cbac-418f-9eac-7c670b5b1d22	10:00 AM	02:00 PM	f	\N	app	\N	456	300
1949	cbdbd4c3-5990-46db-96fd-9acb9a636a59	02:00 PM	06:00 PM	f	\N	app	\N	456	300
1950	840f53be-496b-4413-b92e-37dcbe5cbe56	06:00 PM	10:00 PM	f	\N	app	\N	456	250
1951	0c80cf5b-3a57-4c82-a3d1-a46a7aeac03d	12:00 AM	11:59 PM	f	\N	app	\N	456	800
1952	a1151331-5a18-40ba-86bf-43fcb47a4fff	06:00 AM	10:00 AM	f	\N	app	\N	457	250
1953	b9cff269-ccaf-4c64-bc2b-396499f89c93	10:00 AM	02:00 PM	f	\N	app	\N	457	300
1954	71aa33a2-ddb1-4bfe-8e7f-86e32e0f6bbd	02:00 PM	06:00 PM	f	\N	app	\N	457	300
1955	18d6d14d-1149-4485-b661-acb8f1068935	06:00 PM	10:00 PM	f	\N	app	\N	457	250
1956	2abadb2d-0d83-4e25-a277-ac943b2d830e	12:00 AM	11:59 PM	f	\N	app	\N	457	800
1957	37371b51-6d85-4dc8-8004-c48aaf1a96ff	06:00 AM	10:00 AM	f	\N	app	\N	458	250
1958	2bcf38ac-4668-4e77-88e1-173ebe95d50c	10:00 AM	02:00 PM	f	\N	app	\N	458	300
1959	84e60847-0b8b-4f13-8f5d-c97f5845f679	02:00 PM	06:00 PM	f	\N	app	\N	458	300
1960	38920138-e3e5-4b4d-8c09-012bbb930066	06:00 PM	10:00 PM	f	\N	app	\N	458	250
1961	3a89f6f6-5490-4a96-9458-9e0f779ead95	12:00 AM	11:59 PM	f	\N	app	\N	458	800
2841	5c877c1a-1f8e-4400-8876-8d74abe995c8	06:00 PM	10:00 PM	f	\N	app	\N	629	200
2842	9fb872ab-f169-4f18-a5ff-7c3ea803c83b	12:00 AM	11:59 PM	f	\N	app	\N	629	1000
2844	32255216-a03a-4843-98e0-eba2abafc044	06:00 AM	10:00 AM	f	\N	app	\N	630	200
2845	2777073b-97f3-407d-9615-8a84b39714e1	10:00 AM	02:00 PM	f	\N	app	\N	630	300
2846	e31ab9b6-2a29-431e-b76f-16be3b6a5157	02:00 PM	06:00 PM	f	\N	app	\N	630	300
2847	f7642106-7d4b-4837-a91f-94e3dc208866	06:00 PM	10:00 PM	f	\N	app	\N	630	200
2848	2d87168f-2fe5-4628-9b4f-106cc50d155d	12:00 AM	11:59 PM	f	\N	app	\N	630	1000
2850	cdd3f2dc-3640-409f-a2aa-ff2e907f2e41	06:00 AM	10:00 AM	f	\N	app	\N	631	200
2851	5b1f4fcc-4547-42c1-a3e9-a038300cba65	10:00 AM	02:00 PM	f	\N	app	\N	631	300
2852	ad6507e5-5a24-4b5a-9da5-912b112526fb	02:00 PM	06:00 PM	f	\N	app	\N	631	300
2853	99d9466f-ddcf-4c79-a5d4-dd66598a4450	06:00 PM	10:00 PM	f	\N	app	\N	631	200
2854	7d241ab6-615b-4973-88ad-61df0b551c0c	12:00 AM	11:59 PM	f	\N	app	\N	631	1000
2856	94e65fc1-8638-4af8-bdb0-a1aac181c4bf	06:00 AM	10:00 AM	f	\N	app	\N	632	200
2857	1dbe89ca-cee8-4d1c-aa70-b9e79e1c5ede	10:00 AM	02:00 PM	f	\N	app	\N	632	300
2858	1de734cb-2135-4f76-a7e3-399524a11e18	02:00 PM	06:00 PM	f	\N	app	\N	632	300
2859	f1c806ca-b8f9-40ed-a37c-ca406229ffb3	06:00 PM	10:00 PM	f	\N	app	\N	632	200
2860	d838f211-e7e6-4261-a29e-0ebc626fafa7	12:00 AM	11:59 PM	f	\N	app	\N	632	1000
2862	42135917-58d0-4e49-bf67-ce359ce71710	06:00 AM	10:00 AM	f	\N	app	\N	633	200
2863	8d06bc4e-9e35-44ec-92e5-f0803ac480e4	10:00 AM	02:00 PM	f	\N	app	\N	633	300
2864	d9e42f78-0045-4df2-816b-da006017cf06	02:00 PM	06:00 PM	f	\N	app	\N	633	300
2865	37e22282-2f5a-443d-a848-b1adc8d2c804	06:00 PM	10:00 PM	f	\N	app	\N	633	200
2866	b06a68b9-c7ae-4ddd-9b7c-742332e565b7	12:00 AM	11:59 PM	f	\N	app	\N	633	1000
2868	18d691ea-9957-4d93-ab88-e5e83c286786	06:00 AM	10:00 AM	f	\N	app	\N	634	200
2869	c2cae9b1-df41-48a7-8dff-93381b69c0e6	10:00 AM	02:00 PM	f	\N	app	\N	634	300
2870	b3983b35-dc34-44e3-9293-fa09f7fca7f2	02:00 PM	06:00 PM	f	\N	app	\N	634	300
2871	f3a401a0-a0e8-455f-898c-c74739b58553	06:00 PM	10:00 PM	f	\N	app	\N	634	200
2872	3401172d-2215-4f96-bc86-430eb98c46d9	12:00 AM	11:59 PM	f	\N	app	\N	634	1000
2874	af089b4b-a514-4aba-82a5-e04e0801baa2	06:00 AM	10:00 AM	f	\N	app	\N	635	200
2875	b41e2068-1a8c-4435-bd47-24e4a5090aec	10:00 AM	02:00 PM	f	\N	app	\N	635	300
2876	985a4df6-8395-48e7-a816-2cfbeffe3949	02:00 PM	06:00 PM	f	\N	app	\N	635	300
2877	cb08e6ac-e109-463d-b4b6-a1f6841538d0	06:00 PM	10:00 PM	f	\N	app	\N	635	200
2878	1943f71b-317a-49f3-b721-58a0c71b6be3	12:00 AM	11:59 PM	f	\N	app	\N	635	1000
2880	0d5740cd-b8d8-45f8-80e5-0a9f504b457e	06:00 AM	10:00 AM	f	\N	app	\N	636	200
2881	3e907e48-e110-4dcf-8e17-efdfbcd12f96	10:00 AM	02:00 PM	f	\N	app	\N	636	300
2882	83dbca67-adf7-4525-8484-ffcacf2d28e4	02:00 PM	06:00 PM	f	\N	app	\N	636	300
2883	42217ff8-bb0d-4f18-a05d-75a2218b2ec0	06:00 PM	10:00 PM	f	\N	app	\N	636	200
2884	cacd88e1-02f3-49e1-8f7d-aae771375b99	12:00 AM	11:59 PM	f	\N	app	\N	636	1000
2886	9126dbe7-946a-4657-8b38-d8e270b4bbd9	06:00 AM	10:00 AM	f	\N	app	\N	637	200
2887	e1f3aea0-3631-429b-8dfe-d212ef3b5efd	10:00 AM	02:00 PM	f	\N	app	\N	637	300
2888	207cf0cc-db6c-43fa-abe7-c4be12f2ee97	02:00 PM	06:00 PM	f	\N	app	\N	637	300
2889	23cc7092-a7e5-446b-8b4c-2e7875e42b4a	06:00 PM	10:00 PM	f	\N	app	\N	637	200
2890	6f4e180c-c6db-46c5-a09b-52a097e91649	12:00 AM	11:59 PM	f	\N	app	\N	637	1000
2892	02a2c56a-1f9b-4677-b67a-a448dcd5c786	06:00 AM	10:00 AM	f	\N	app	\N	638	200
2893	b8bc6fc2-7b89-4cbf-a27d-2dce2eb26936	10:00 AM	02:00 PM	f	\N	app	\N	638	300
2894	eaacbbbb-11a7-4a7b-96fd-b1494becd1fd	02:00 PM	06:00 PM	f	\N	app	\N	638	300
2895	0d676aa7-08a0-4793-b1cb-7cf84e4d5bcd	06:00 PM	10:00 PM	f	\N	app	\N	638	200
2896	db57daae-e4ac-45b8-b9a3-83d7705e1277	12:00 AM	11:59 PM	f	\N	app	\N	638	1000
2898	765191eb-a1a2-4606-a9c5-65733227da80	06:00 AM	10:00 AM	f	\N	app	\N	639	200
2899	0360a005-ae3a-4cda-abf6-475166af2d8f	10:00 AM	02:00 PM	f	\N	app	\N	639	300
2900	276e15b2-2bde-49ac-ad82-50ae06b8f183	02:00 PM	06:00 PM	f	\N	app	\N	639	300
2901	04d05ef5-4baa-40a8-979d-d6bf24cfeee9	06:00 PM	10:00 PM	f	\N	app	\N	639	200
2902	c02d2b06-6e73-47ca-850a-c89b043c045d	12:00 AM	11:59 PM	f	\N	app	\N	639	1000
2861	0b6e774d-4bb5-48e9-b050-8af78e24f253	10:00 PM	05:00 AM	f	\N	app	\N	632	300
2855	604f1eb4-e19b-4ba4-87ee-7913d8275cce	10:00 PM	05:00 AM	f	\N	app	\N	631	300
2903	24cb1b48-56ef-4b3d-a956-f505c7833f0b	10:00 PM	05:00 AM	f	\N	app	\N	639	300
2897	2c9f78ec-e484-4d1f-9635-29426b5c713f	10:00 PM	05:00 AM	f	\N	app	\N	638	300
2885	a7c5ba9f-4624-4308-9348-6a462f63ee3c	10:00 PM	05:00 AM	f	\N	app	\N	636	300
2873	deda24f5-fbe7-44a2-83d9-2a3504ccb1ff	10:00 PM	05:00 AM	f	\N	app	\N	634	300
2867	611e9a3a-0c81-40c4-a315-8ccf434691c4	10:00 PM	05:00 AM	f	\N	app	\N	633	300
2891	b22b874b-f314-42fa-b4d8-c492b07e5bc6	10:00 PM	05:00 AM	f	\N	app	\N	637	300
2879	05a6e70e-002a-4803-a282-114eacf55511	10:00 PM	05:00 AM	f	\N	app	\N	635	300
2908	f798aa7d-6840-4d32-be83-a07af64f25f1	06:00 PM	06:00 AM	f	\N	app	\N	640	700
2909	55021011-630f-435a-876b-04c362d25a7e	06:00 AM	10:00 AM	f	\N	app	\N	641	300
2910	35acf435-e1c5-46e8-833d-a3e67765a941	10:00 AM	02:00 PM	f	\N	app	\N	641	300
2911	9410ffba-a71d-46bf-a355-7c2790cbeb0e	02:00 PM	06:00 PM	f	\N	app	\N	641	300
2912	eaac38fa-6060-4a1e-b95a-e4d4ef8822f9	06:00 PM	10:00 PM	f	\N	app	\N	641	300
2913	1b315925-4b50-4538-bcfc-8211db67c441	06:00 PM	06:00 AM	f	\N	app	\N	641	700
2914	503f3261-b4c0-4b49-aac1-f8261813b21b	06:00 AM	10:00 AM	f	\N	app	\N	642	300
2915	f528f82e-7cfb-490a-a82d-af949da44b31	10:00 AM	02:00 PM	f	\N	app	\N	642	300
2916	93bebe71-087a-4c83-9728-4be9220f00af	02:00 PM	06:00 PM	f	\N	app	\N	642	300
2917	77386e51-876f-40e9-81dd-f01b5be1881f	06:00 PM	10:00 PM	f	\N	app	\N	642	300
2918	446cc8e4-6668-43cf-b2f3-732d84b8a80f	06:00 PM	06:00 AM	f	\N	app	\N	642	700
2919	7c54452a-a653-48d6-b766-3a316d35cb8e	06:00 AM	10:00 AM	f	\N	app	\N	643	300
2920	06e11dd7-6250-43c5-8e77-cc1eeba61039	10:00 AM	02:00 PM	f	\N	app	\N	643	300
2921	5fd382c7-780e-4f80-a7b6-70f93db7720f	02:00 PM	06:00 PM	f	\N	app	\N	643	300
2922	a7656d97-ede4-4f3e-9371-5ed8ef5d8ab1	06:00 PM	10:00 PM	f	\N	app	\N	643	300
2923	1463e49f-7377-4d7b-a923-4b3b6d81f978	06:00 PM	06:00 AM	f	\N	app	\N	643	700
2924	b8f4a0e1-4dda-41d6-988a-8ab6f534f3a5	06:00 AM	10:00 AM	f	\N	app	\N	644	300
2555	0ad38169-3ba7-4986-96d7-98ec9582f5aa	10:00 PM	05:00 AM	f	\N	app	\N	581	300
2711	64aec9fc-4888-4f11-bde1-4be8c54b8e43	10:00 PM	05:00 AM	f	\N	app	\N	607	300
2579	0e407762-8af4-43b7-a343-28c3b3ec826f	10:00 PM	05:00 AM	f	\N	app	\N	585	300
2645	c2b25c7d-2d12-4475-bfcd-1eae167a68ad	10:00 PM	05:00 AM	f	\N	app	\N	596	300
2567	0cda8514-8751-499f-a6a6-d940def3b95e	10:00 PM	05:00 AM	f	\N	app	\N	583	300
2615	cead8e3b-8197-4293-85fc-ab1e00896302	10:00 PM	05:00 AM	f	\N	app	\N	591	300
2621	2be588a2-7120-4784-bbaa-66ef01cf8a27	10:00 PM	05:00 AM	f	\N	app	\N	592	300
2633	db13984f-e5b1-47d5-9d22-1b3ae9eb918d	10:00 PM	05:00 AM	f	\N	app	\N	594	300
2663	24e1b6bc-c9c0-4dfc-9b4d-e42ef77036fa	10:00 PM	05:00 AM	f	\N	app	\N	599	300
2735	cf2c2f5c-d51f-47d9-ac78-d5383f3b89fa	10:00 PM	05:00 AM	f	\N	app	\N	611	300
2657	53ea381c-20e6-405e-ad3f-555840532f12	10:00 PM	05:00 AM	f	\N	app	\N	598	300
2843	a974f2f9-c40a-42e1-95fc-e32230cd24ef	10:00 PM	05:00 AM	f	\N	app	\N	629	300
2639	2cd84c62-9eef-4719-b037-f488e0746915	10:00 PM	05:00 AM	f	\N	app	\N	595	300
2729	a9490538-0953-4277-8829-7726566526c4	10:00 PM	05:00 AM	f	\N	app	\N	610	300
2585	9a838101-a49f-4f13-929d-295571a028c9	10:00 PM	05:00 AM	f	\N	app	\N	586	300
2753	bdd84d50-145d-48e2-83bf-10f21f0961f4	10:00 PM	05:00 AM	f	\N	app	\N	614	300
2765	d228067b-ac34-4e78-9fcd-10e3719577d8	10:00 PM	05:00 AM	f	\N	app	\N	616	300
2747	e7078194-03af-4c70-9783-96d04ba4b264	10:00 PM	05:00 AM	f	\N	app	\N	613	300
2699	b69cef25-06c3-4652-b14d-d23418cebbed	10:00 PM	05:00 AM	f	\N	app	\N	605	300
2837	6312d027-146a-490e-8fac-1ea34937c675	10:00 PM	05:00 AM	f	\N	app	\N	628	300
2669	d5dc80d8-29b0-4d77-b5c1-7d74b59e2cba	10:00 PM	05:00 AM	f	\N	app	\N	600	300
2651	b6a93614-508e-42c2-8a44-833e451978a2	10:00 PM	05:00 AM	f	\N	app	\N	597	300
2627	a3577a22-9d7c-47e3-b0b9-0dcb192579ef	10:00 PM	05:00 AM	f	\N	app	\N	593	300
2681	5fadc67e-fe9e-4510-a03d-f4dc9f8c576d	10:00 PM	05:00 AM	f	\N	app	\N	602	300
2603	0f28bd45-ada6-441b-b4ce-a864115b9ef7	10:00 PM	05:00 AM	f	\N	app	\N	589	300
2687	18ecd8f8-09d4-4690-a8f6-54ecbc59f2ae	10:00 PM	05:00 AM	f	\N	app	\N	603	300
2675	7352c245-41e3-491e-b7bc-13c145fdca2f	10:00 PM	05:00 AM	f	\N	app	\N	601	300
2597	dd325749-a2b5-4f92-bf3f-9473b3d0a34c	10:00 PM	05:00 AM	f	\N	app	\N	588	300
2849	6ff9f7a4-acef-4273-ac93-10cb732039c8	10:00 PM	05:00 AM	f	\N	app	\N	630	300
2759	d9799c23-704c-4e1d-a9c1-11d55bdaaf55	10:00 PM	05:00 AM	f	\N	app	\N	615	300
2591	818ccf38-d187-4990-b556-dc79bc2179b5	10:00 PM	05:00 AM	f	\N	app	\N	587	300
2693	b6be1682-a2ad-47c7-9d14-f422a77a71af	10:00 PM	05:00 AM	f	\N	app	\N	604	300
2807	f3ba2580-c732-430b-ae42-f0b9985166ad	10:00 PM	05:00 AM	f	\N	app	\N	623	300
2741	ad27f580-4211-4b6d-a72e-c41b66923966	10:00 PM	05:00 AM	f	\N	app	\N	612	300
2723	ac671ff3-3bde-4d41-87b8-38d196ffc22d	10:00 PM	05:00 AM	f	\N	app	\N	609	300
2609	8cec8a3e-feb7-4551-af16-9c8bec666b39	10:00 PM	05:00 AM	f	\N	app	\N	590	300
2813	4d4d28a7-e333-4cc9-90e9-7f69853f45d8	10:00 PM	05:00 AM	f	\N	app	\N	624	300
2705	ab692e61-32aa-404f-b604-15880ea90177	10:00 PM	05:00 AM	f	\N	app	\N	606	300
2717	650fa281-9505-45ef-82fe-3b15c77df1f4	10:00 PM	05:00 AM	f	\N	app	\N	608	300
2801	2b87e00e-bd86-4e4d-84d1-7ecc4acaa780	10:00 PM	05:00 AM	f	\N	app	\N	622	300
2561	acecbd81-cb51-46f9-9670-9be9f3dac199	10:00 PM	05:00 AM	f	\N	app	\N	582	300
2549	4616e56f-4514-4c1f-b3f8-d1f13a75cc15	10:00 PM	05:00 AM	f	\N	app	\N	580	300
2783	8ee3a456-3012-48c8-93bb-f939ef759703	10:00 PM	05:00 AM	f	\N	app	\N	619	300
2819	a41d182f-0212-4890-aa34-5a794e21c381	10:00 PM	05:00 AM	f	\N	app	\N	625	300
2777	02e60d59-f33a-4df8-9b76-a277b696c19a	10:00 PM	05:00 AM	f	\N	app	\N	618	300
2789	d108ae2b-1d30-44ce-bd26-565b0186f787	10:00 PM	05:00 AM	f	\N	app	\N	620	300
2831	42bc8186-094a-4171-8ea6-4748288c0588	10:00 PM	05:00 AM	f	\N	app	\N	627	300
2537	3a58e255-03e3-45ab-bfd3-03eacf8cf649	10:00 PM	05:00 AM	f	\N	app	\N	578	300
2543	cdda2c8b-c980-4e29-a9f1-f6b9498fca53	10:00 PM	05:00 AM	f	\N	app	\N	579	300
2825	3427c6c0-cd57-4d17-b54e-fe58609f7593	10:00 PM	05:00 AM	f	\N	app	\N	626	300
2771	d8a5aaef-ff95-42cc-be27-d558c8ff10a8	10:00 PM	05:00 AM	f	\N	app	\N	617	300
2573	c793ade5-cec1-4223-a66a-e980b0787743	10:00 PM	05:00 AM	f	\N	app	\N	584	300
2795	5f50bb96-1bde-4299-9736-5bd8d2404364	10:00 PM	05:00 AM	f	\N	app	\N	621	300
2225	fa52a4b3-a3b7-4187-b2a7-d6c1c992186b	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	516	350
2301	1d7d9771-a64c-4b6e-943f-fb3f26bf6db4	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	531	350
2265	de86d93d-32e3-4c86-a597-3acf26e614a1	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	524	350
2925	4081d911-1c28-49db-b591-69bcd66f0695	10:00 AM	02:00 PM	f	\N	app	\N	644	300
2926	94f146d0-ea7f-4662-8f58-4fb494561df4	02:00 PM	06:00 PM	f	\N	app	\N	644	300
2927	355c5429-74db-4726-b6dd-2e2aa36883c7	06:00 PM	10:00 PM	f	\N	app	\N	644	300
2928	57fb00fa-26e8-4b74-998d-91ea70e5d539	06:00 PM	06:00 AM	f	\N	app	\N	644	700
2929	cf8c2c7f-952c-4056-bc41-b7f2355dcba5	06:00 AM	10:00 AM	f	\N	app	\N	645	300
2930	9b7cf5e6-d0ae-4957-904f-3dcf26f2c768	10:00 AM	02:00 PM	f	\N	app	\N	645	300
2931	8ff6f5d8-589d-49ed-b406-dcf20f6dc7ab	02:00 PM	06:00 PM	f	\N	app	\N	645	300
2932	002c1625-ab94-4b88-a6f1-8406b1dcaac7	06:00 PM	10:00 PM	f	\N	app	\N	645	300
2933	8d1a8099-0be2-4a00-ac3b-74ae32448aa9	06:00 PM	06:00 AM	f	\N	app	\N	645	700
2934	b4b97ca4-7988-4a69-bc3e-cf037834156b	06:00 AM	10:00 AM	f	\N	app	\N	646	300
2935	8e3b2f9a-850b-4203-94f7-c9ce01e1edf0	10:00 AM	02:00 PM	f	\N	app	\N	646	300
2936	ce9967c5-a954-4c57-99e7-5205d61445cb	02:00 PM	06:00 PM	f	\N	app	\N	646	300
2937	ca5a62a0-b4e7-499c-b6cc-03e817beae86	06:00 PM	10:00 PM	f	\N	app	\N	646	300
2938	97775e2d-193e-4bca-98d2-567c6fb0c7f1	06:00 PM	06:00 AM	f	\N	app	\N	646	700
2939	80d8611e-b640-4315-9fb9-c98b37884958	06:00 AM	10:00 AM	f	\N	app	\N	647	300
2940	c58d9881-0518-4761-8bbd-ad6083b4659d	10:00 AM	02:00 PM	f	\N	app	\N	647	300
2941	dbaa20d2-cab5-44b3-990a-06f1d5facbf0	02:00 PM	06:00 PM	f	\N	app	\N	647	300
2942	869a4280-d439-42a9-bc90-c7ef719a96a6	06:00 PM	10:00 PM	f	\N	app	\N	647	300
2943	b40d0f07-7cb2-4d47-92ca-77a9ac45f9a9	06:00 PM	06:00 AM	f	\N	app	\N	647	700
2193	88fba7c2-2939-4cbd-9ce0-06ccc927a619	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	509	900
2189	03e72175-f474-4073-85dc-374a420f5930	06:00 AM	10:00 AM	t	3	admin	2025-03-01 00:00:00	509	200
2190	fcbf83cc-d7c0-4178-8bb0-7e301d50b277	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	509	350
2191	4d32b1bd-592d-4fc4-b0a7-e36edcedd267	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	509	350
2192	9a21d45a-45c2-4774-babf-cae9a91daed4	06:00 PM	10:00 PM	t	3	admin	2025-03-01 00:00:00	509	200
2365	765e9437-b068-4d82-879e-59434794d737	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	545	900
2231	e6fe55a2-a833-456d-8d03-7e12c5b43dce	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	517	350
2944	ddebca98-5847-4704-8390-948a22ed417b	06:00 AM	10:00 AM	f	\N	app	\N	648	300
2945	03a4392a-3b34-4f93-b93d-16f12844f2d5	10:00 AM	02:00 PM	f	\N	app	\N	648	300
2946	06377bba-4e76-46c0-8019-13056f3efe01	02:00 PM	06:00 PM	f	\N	app	\N	648	300
2947	d6af56be-c951-45b2-9f98-b7598e2dbb09	06:00 PM	10:00 PM	f	\N	app	\N	648	300
2948	fa20eb41-7703-4723-bf00-3f4569ccf497	06:00 PM	06:00 AM	f	\N	app	\N	648	700
2949	7a74508e-8559-4440-b0cb-ab567b85fc28	06:00 AM	10:00 AM	f	\N	app	\N	649	300
2950	52e80407-cb16-4e15-8234-7ad33661c596	10:00 AM	02:00 PM	f	\N	app	\N	649	300
2951	cbbb6d1b-ca0e-4a4f-b37d-20a632bc1a91	02:00 PM	06:00 PM	f	\N	app	\N	649	300
2952	41514358-3343-4bd0-bd9d-9332b3fba5b7	06:00 PM	10:00 PM	f	\N	app	\N	649	300
2953	c4c22552-aa04-43be-8741-2dfd5286288a	06:00 PM	06:00 AM	f	\N	app	\N	649	700
2954	75ab8d20-db73-448e-afb6-ad360d1d44da	06:00 AM	10:00 AM	f	\N	app	\N	650	300
2955	c25a99ec-a7b4-4730-8147-747ff85ad7aa	10:00 AM	02:00 PM	f	\N	app	\N	650	300
2956	894c4a5a-2707-4307-bb34-d695799224c1	02:00 PM	06:00 PM	f	\N	app	\N	650	300
2957	0b4c9791-7e06-4b62-adfa-01d86701fce6	06:00 PM	10:00 PM	f	\N	app	\N	650	300
2958	1fdf1b9c-b44a-4507-923f-01725ab73e7b	06:00 PM	06:00 AM	f	\N	app	\N	650	700
2959	cac31f99-55ae-45a3-a77f-e9cf690603e6	06:00 AM	10:00 AM	f	\N	app	\N	651	300
2960	30c679f8-06a8-4827-a2b5-c83c0ed9d76c	10:00 AM	02:00 PM	f	\N	app	\N	651	300
2961	b3b6e24e-ff1d-4421-80a7-0f8d96950d0b	02:00 PM	06:00 PM	f	\N	app	\N	651	300
2962	28af07c4-f0fc-402d-8fa9-1150ca134577	06:00 PM	10:00 PM	f	\N	app	\N	651	300
2963	9a5cee9c-9f8e-4d10-afe0-74fc320ad8ee	06:00 PM	06:00 AM	f	\N	app	\N	651	700
2964	5fcb446d-b6b2-4ef5-8efa-89868da5dbc2	06:00 AM	10:00 AM	f	\N	app	\N	652	300
2965	a0cb67f2-fc87-49de-a6b5-64f4192bd508	10:00 AM	02:00 PM	f	\N	app	\N	652	300
2966	f6fd14f0-c371-4033-90d5-5cfca4275990	02:00 PM	06:00 PM	f	\N	app	\N	652	300
2967	5db839f7-f55f-44b6-8f0f-e13e77c7f7a6	06:00 PM	10:00 PM	f	\N	app	\N	652	300
2968	4943254e-21c6-4f89-996e-a2596b10d513	06:00 PM	06:00 AM	f	\N	app	\N	652	700
2969	2b641bcc-5f68-43ef-ae87-f445417f4f6a	06:00 AM	10:00 AM	f	\N	app	\N	653	300
2970	9d10681d-ab7c-4f93-b521-c22cca9043a7	10:00 AM	02:00 PM	f	\N	app	\N	653	300
2971	8eb02ff9-61f6-4de8-8c08-592c50d7d093	02:00 PM	06:00 PM	f	\N	app	\N	653	300
2972	4ff5b523-f83f-4122-845d-6a774e05e495	06:00 PM	10:00 PM	f	\N	app	\N	653	300
2973	3193f33b-dd39-4e63-b62e-751d5f1b5073	06:00 PM	06:00 AM	f	\N	app	\N	653	700
2974	ec8cd760-6930-437b-a176-e41f39447f87	06:00 AM	10:00 AM	f	\N	app	\N	654	300
2975	e214f4a3-90a3-42b4-b941-024bb2759b92	10:00 AM	02:00 PM	f	\N	app	\N	654	300
2976	f0517f6e-d2d3-4938-8a15-c16c67dd442a	02:00 PM	06:00 PM	f	\N	app	\N	654	300
2977	324c5b86-f33b-4955-9360-fe9fa9b82a5c	06:00 PM	10:00 PM	f	\N	app	\N	654	300
2978	35a87738-8ed8-43a5-926a-86276b5121ef	06:00 PM	06:00 AM	f	\N	app	\N	654	700
2979	63ea674b-c2ef-4f66-8b08-2840362898f9	06:00 AM	10:00 AM	f	\N	app	\N	655	300
2980	f1298b24-54c0-44fd-b4b7-6de0c304edd6	10:00 AM	02:00 PM	f	\N	app	\N	655	300
2981	ebbf3ebc-4668-45ff-9d2e-6b661f9e37a9	02:00 PM	06:00 PM	f	\N	app	\N	655	300
2982	4b600de2-7876-4029-bdaa-acaca43a230d	06:00 PM	10:00 PM	f	\N	app	\N	655	300
2983	3d5373b9-f690-49c2-87ba-d9ddab771fe8	06:00 PM	06:00 AM	f	\N	app	\N	655	700
2984	53d42870-8813-40bd-bdfe-6b0915293755	06:00 AM	10:00 AM	f	\N	app	\N	656	300
2985	801977e7-4a7b-4a7a-a51f-b54421f8ab3c	10:00 AM	02:00 PM	f	\N	app	\N	656	300
2986	276d8ab9-79cd-42ab-b3d3-94244cbb5f26	02:00 PM	06:00 PM	f	\N	app	\N	656	300
2987	532e871d-83ca-4f32-9442-225d172fbe97	06:00 PM	10:00 PM	f	\N	app	\N	656	300
2988	e937af24-16fd-4c2f-9612-4bf7a877d7ba	06:00 PM	06:00 AM	f	\N	app	\N	656	700
2989	efe8c6ea-0dd1-4f96-9462-abab2c87768c	06:00 AM	10:00 AM	f	\N	app	\N	657	300
2990	ef211036-28a6-44a8-ae24-13b53bacf150	10:00 AM	02:00 PM	f	\N	app	\N	657	300
2991	9c8212f1-1596-43b2-8130-546150cb7da2	02:00 PM	06:00 PM	f	\N	app	\N	657	300
2992	40563974-31c2-4bee-9dc2-e942432df9d2	06:00 PM	10:00 PM	f	\N	app	\N	657	300
2993	5cb5826d-6adf-44c0-9b83-197c3cb80d5b	06:00 PM	06:00 AM	f	\N	app	\N	657	700
2994	1b7226e7-a955-49eb-b3a1-1b76955334df	06:00 AM	10:00 AM	f	\N	app	\N	658	300
2995	2a427e01-ae86-40b8-8e9f-7ad81efad332	10:00 AM	02:00 PM	f	\N	app	\N	658	300
2996	93b3e469-a3c1-423f-a029-ab3e836e917e	02:00 PM	06:00 PM	f	\N	app	\N	658	300
2997	1b8a3d5f-1050-4356-8ca2-f18da36d5377	06:00 PM	10:00 PM	f	\N	app	\N	658	300
2194	41985c57-8a4c-4475-ad43-883aa71f30c5	06:00 AM	10:00 AM	f	\N	app	\N	510	200
2195	3d3080cc-6b3c-43f4-ac06-627a417a1500	10:00 AM	02:00 PM	f	\N	app	\N	510	350
2196	8be5d85b-5f88-4975-9fcc-7375e98917cb	02:00 PM	06:00 PM	f	\N	app	\N	510	350
2197	663dfcfb-da12-457f-8c21-9123eaf57a3a	06:00 PM	10:00 PM	f	\N	app	\N	510	200
2198	8df02ce6-4902-433f-9c7f-bee008d114d4	12:00 AM	11:59 PM	f	\N	app	\N	510	900
2199	29f224cb-b47d-4c8c-b771-3547a934c620	06:00 AM	10:00 AM	f	\N	app	\N	511	200
2200	27f85b57-d7ce-4179-82c8-97d05692f121	10:00 AM	02:00 PM	f	\N	app	\N	511	350
2201	b53b4189-ca46-4e72-ab6f-a4c52da4b5cc	02:00 PM	06:00 PM	f	\N	app	\N	511	350
2202	3aa4eb52-f6b1-45b5-a8bb-b552c2d60b0e	06:00 PM	10:00 PM	f	\N	app	\N	511	200
2203	18e74af4-0f67-43f2-b37d-9adb3ada0553	12:00 AM	11:59 PM	f	\N	app	\N	511	900
2204	4c146781-f449-4ae2-9589-65421e4f4c61	06:00 AM	10:00 AM	f	\N	app	\N	512	200
2205	c55c1c6f-55d7-4320-9c22-8da366bcbbb2	10:00 AM	02:00 PM	f	\N	app	\N	512	350
2206	70fee6db-def3-4916-ab84-248841ab9406	02:00 PM	06:00 PM	f	\N	app	\N	512	350
2207	fa84bea7-4d87-4490-a1b4-5f0b30fd8b8f	06:00 PM	10:00 PM	f	\N	app	\N	512	200
2208	06e01100-bb3a-4949-8335-ad2b4784e86d	12:00 AM	11:59 PM	f	\N	app	\N	512	900
2209	7472d289-1976-45c3-b752-d4466f091388	06:00 AM	10:00 AM	f	\N	app	\N	513	200
2210	fd550b9b-d2ed-4d75-a619-f03c67f513c9	10:00 AM	02:00 PM	f	\N	app	\N	513	350
2211	7afc45e0-2014-4827-af37-ebacefc876d2	02:00 PM	06:00 PM	f	\N	app	\N	513	350
2212	609fe44a-a174-4faa-8a72-71b066e95f9a	06:00 PM	10:00 PM	f	\N	app	\N	513	200
2213	774ef5cd-a537-4dc5-a503-18c2d3f47b9c	12:00 AM	11:59 PM	f	\N	app	\N	513	900
2214	397f59bf-fd65-4f6f-b7e6-fc50ee47da59	06:00 AM	10:00 AM	f	\N	app	\N	514	200
2215	822b02e0-793a-444d-bea7-fda27e87e355	10:00 AM	02:00 PM	f	\N	app	\N	514	350
2216	92b1a6d4-d42a-42ec-bb9a-cb111c6de278	02:00 PM	06:00 PM	f	\N	app	\N	514	350
2217	c5d9547d-c7b2-4027-a927-0e7afdf34e0c	06:00 PM	10:00 PM	f	\N	app	\N	514	200
2218	ce571bd7-6945-4cfc-b577-a10f52d813ec	12:00 AM	11:59 PM	f	\N	app	\N	514	900
2219	fc633884-4e65-4b4a-8a79-a5fbc1a3707b	06:00 AM	10:00 AM	f	\N	app	\N	515	200
2220	ef90f29a-547c-44ee-81d3-89b1ff13f03f	10:00 AM	02:00 PM	f	\N	app	\N	515	350
2222	705b83a1-f7aa-4e47-99db-07bcaaf8999b	06:00 PM	10:00 PM	f	\N	app	\N	515	200
2223	2baa54bd-1914-4be6-8838-a29bc0adb070	12:00 AM	11:59 PM	f	\N	app	\N	515	900
2224	b1334c05-6bf9-468a-85a4-f51f96578451	06:00 AM	10:00 AM	f	\N	app	\N	516	200
2227	eb4517bb-488b-47f2-b6ef-d20e44b9ab72	06:00 PM	10:00 PM	f	\N	app	\N	516	200
2234	5f576704-d1eb-4d17-aaa5-b2242a6bcec8	06:00 AM	10:00 AM	f	\N	app	\N	518	200
2235	bc45ed1a-73bf-4406-a209-465b0c1adbb5	10:00 AM	02:00 PM	f	\N	app	\N	518	350
2236	d7319eb5-c82a-4507-acf4-2b661b6de166	02:00 PM	06:00 PM	f	\N	app	\N	518	350
2237	14ac19f9-d7d0-4be6-876d-77205de18eb9	06:00 PM	10:00 PM	f	\N	app	\N	518	200
2238	377e5049-95f0-46e4-b2cf-dcf85c4fcacb	12:00 AM	11:59 PM	f	\N	app	\N	518	900
2239	60f856df-e2d6-4192-9543-a9da987ee169	06:00 AM	10:00 AM	f	\N	app	\N	519	200
2240	64edcb42-4fb4-4964-a64a-a6232b960887	10:00 AM	02:00 PM	f	\N	app	\N	519	350
2241	3635c71e-9744-489f-8cd8-5c8e2c6fe522	02:00 PM	06:00 PM	f	\N	app	\N	519	350
2242	2f9b8e15-c9bf-424f-b003-a799cb1a4726	06:00 PM	10:00 PM	f	\N	app	\N	519	200
2243	3a8dd625-57ee-4d1b-a7fa-9da4a0909c9f	12:00 AM	11:59 PM	f	\N	app	\N	519	900
2244	336accf8-809b-4765-9d11-3e46b5b4d6c9	06:00 AM	10:00 AM	f	\N	app	\N	520	200
2245	5549b1bb-a068-41ea-8546-2787ece0a640	10:00 AM	02:00 PM	f	\N	app	\N	520	350
2246	853f477c-7801-4923-a213-6a30bdc5bfd6	02:00 PM	06:00 PM	f	\N	app	\N	520	350
2247	8ed7ae23-4b16-4a9a-9be9-b23ffe3375f4	06:00 PM	10:00 PM	f	\N	app	\N	520	200
2248	695a8372-e514-4207-a9c3-25a72b54d021	12:00 AM	11:59 PM	f	\N	app	\N	520	900
2249	d92aaf53-6c91-4ad7-b43c-e69a09d815d5	06:00 AM	10:00 AM	f	\N	app	\N	521	200
2250	39c8d2cf-e863-4a32-b0f2-f87a3b7f471b	10:00 AM	02:00 PM	f	\N	app	\N	521	350
2251	2422ff22-5e5d-4d4f-9fd3-95da7d4ae710	02:00 PM	06:00 PM	f	\N	app	\N	521	350
2252	88244ff6-eaff-45f4-b6bb-d5344d0595a9	06:00 PM	10:00 PM	f	\N	app	\N	521	200
2253	39aa8078-70eb-46c2-b673-9a5a07164588	12:00 AM	11:59 PM	f	\N	app	\N	521	900
2254	c294ff22-0560-4b25-8652-bd8cfb828073	06:00 AM	10:00 AM	f	\N	app	\N	522	200
2257	f019ffbc-5d7a-4d38-bdfb-2adbaddfc395	06:00 PM	10:00 PM	f	\N	app	\N	522	200
2259	e02b20c2-d821-4e1a-b3e8-cd8bbd81b7c5	06:00 AM	10:00 AM	f	\N	app	\N	523	200
2260	024d35cb-640c-40f6-a7c5-85f892c424bd	10:00 AM	02:00 PM	f	\N	app	\N	523	350
2261	3accda9b-24ff-4fce-9baf-a8df45510bd1	02:00 PM	06:00 PM	f	\N	app	\N	523	350
2262	80cc3c7c-4f75-4a99-8b61-dbdd28ac34b4	06:00 PM	10:00 PM	f	\N	app	\N	523	200
2263	0a548e5a-1b4e-4655-9386-65b4dc1fe752	12:00 AM	11:59 PM	f	\N	app	\N	523	900
2264	1cf38a28-e649-4926-885e-1042b05142b9	06:00 AM	10:00 AM	f	\N	app	\N	524	200
2266	70b286a4-633f-48d3-901a-b705f0021802	02:00 PM	06:00 PM	f	\N	app	\N	524	350
2267	e7ed1e93-bfa9-4998-9e33-ba03f01808f3	06:00 PM	10:00 PM	f	\N	app	\N	524	200
2268	4d24dc84-3580-4abb-a1e4-a4cbaf5c3b45	12:00 AM	11:59 PM	f	\N	app	\N	524	900
2269	f8d639af-d4d3-455f-9b4b-f1a4fd32c456	06:00 AM	10:00 AM	f	\N	app	\N	525	200
2270	4116b699-d461-416d-a2d0-b2c6add74678	10:00 AM	02:00 PM	f	\N	app	\N	525	350
2271	623f6f81-f93b-4620-9abc-e472bd7fe3c8	02:00 PM	06:00 PM	f	\N	app	\N	525	350
2272	584c5ff9-4f67-4713-bced-2583aa6deffa	06:00 PM	10:00 PM	f	\N	app	\N	525	200
2273	5e7d800a-bd85-444b-a534-43020a2d134b	12:00 AM	11:59 PM	f	\N	app	\N	525	900
2274	47d8cdbe-b6ec-44dc-b3b8-316452abb969	06:00 AM	10:00 AM	f	\N	app	\N	526	200
2226	a609065b-8024-4492-bfb3-a1233581fbee	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	516	350
2228	e5fe35e7-a310-42a7-926a-0c2d369ab330	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	516	900
2275	696974c9-f236-453a-b395-bca9c539f43c	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	526	350
2255	312f815e-f491-454a-b995-5c7ffb3e8b00	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	522	350
2256	72fc2aa9-dcb4-4d92-b8fb-1cb78a9dcd19	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	522	350
2258	64da963f-9bae-4b8f-925c-841469d02d64	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	522	900
2229	3d91aff2-f632-4e77-adcf-7f4c0c408b36	06:00 AM	10:00 AM	t	3	admin	2025-03-01 00:00:00	517	200
2230	5f45dfa2-08a1-4019-8f53-1e14a47a7cd6	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	517	350
2232	ecb0bde3-6b98-48c4-8dd8-fc28a5ab93ed	06:00 PM	10:00 PM	t	3	admin	2025-03-01 00:00:00	517	200
2233	c92bb192-0260-44ce-b147-64cefa72bad2	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	517	900
2277	613440b5-f813-482f-9d05-44146e8e9a2a	06:00 PM	10:00 PM	f	\N	app	\N	526	200
2279	d6d56fb5-b28f-465a-a24c-2267ff72fcbc	06:00 AM	10:00 AM	f	\N	app	\N	527	200
2280	5345a130-705a-4843-ad99-7adc4e410735	10:00 AM	02:00 PM	f	\N	app	\N	527	350
2281	735e0d1d-a39a-48d5-b39b-d68ba28591e5	02:00 PM	06:00 PM	f	\N	app	\N	527	350
2282	ebc6782c-3760-46b0-9380-7e24bce87a16	06:00 PM	10:00 PM	f	\N	app	\N	527	200
2283	91c7f419-b72e-4f75-9025-6d3dc6df1062	12:00 AM	11:59 PM	f	\N	app	\N	527	900
2284	a4cffd76-28c4-477a-9b8c-d53c42e37418	06:00 AM	10:00 AM	f	\N	app	\N	528	200
2285	bec27b90-25a3-48bf-834c-919df93e62fa	10:00 AM	02:00 PM	f	\N	app	\N	528	350
2286	8b0a215b-1416-4ff0-8669-3f8526ed9e48	02:00 PM	06:00 PM	f	\N	app	\N	528	350
2287	44d2e515-35d6-45af-ad50-ff2f5865f353	06:00 PM	10:00 PM	f	\N	app	\N	528	200
2288	6b8aa4a2-a198-4a0a-967c-fd41f1546006	12:00 AM	11:59 PM	f	\N	app	\N	528	900
2289	1274143c-b532-495d-9ede-58e777213ff3	06:00 AM	10:00 AM	f	\N	app	\N	529	200
2290	948d9106-902b-4465-a301-73c8a65573a6	10:00 AM	02:00 PM	f	\N	app	\N	529	350
2291	3bb5cb5e-f28e-487c-991b-141763348a67	02:00 PM	06:00 PM	f	\N	app	\N	529	350
2292	ea5054fe-7bbe-4450-a51c-9566d386efc0	06:00 PM	10:00 PM	f	\N	app	\N	529	200
2293	c6d004e5-5506-4459-93b2-ae9b2f349315	12:00 AM	11:59 PM	f	\N	app	\N	529	900
2294	52d700bc-1a15-4ebf-8453-defb8a31df1d	06:00 AM	10:00 AM	f	\N	app	\N	530	200
2295	abe58e4d-d7ee-482b-8632-fb62fef4a58c	10:00 AM	02:00 PM	f	\N	app	\N	530	350
2296	baa7fbbd-45c4-4b15-904c-8d9330eb8814	02:00 PM	06:00 PM	f	\N	app	\N	530	350
2297	0d3b52bf-9fa5-49e1-9134-f99933e245d3	06:00 PM	10:00 PM	f	\N	app	\N	530	200
2298	eac70e80-d3f2-417a-9f21-e607790b7172	12:00 AM	11:59 PM	f	\N	app	\N	530	900
2299	6af3fe7a-5ead-4af4-beed-b9746cc79c3d	06:00 AM	10:00 AM	f	\N	app	\N	531	200
2300	5bb098e6-3ce5-42da-b511-c51ecba368f1	10:00 AM	02:00 PM	f	\N	app	\N	531	350
2302	e142a3dc-6471-4c91-8e9c-3806d1fca632	06:00 PM	10:00 PM	f	\N	app	\N	531	200
2303	50e55b6e-cda8-4ef7-a9b1-e3d79197e279	12:00 AM	11:59 PM	f	\N	app	\N	531	900
2304	07ce59a5-136f-4a1e-b29b-54ec0489ac43	06:00 AM	10:00 AM	f	\N	app	\N	532	200
2310	99a5dc27-8c35-4b36-a862-8946b25959ab	10:00 AM	02:00 PM	f	\N	app	\N	533	350
2311	6fab16bb-a99d-4ff3-8bb7-ae87c3056707	02:00 PM	06:00 PM	f	\N	app	\N	533	350
2312	2b24b0b0-0b61-4adb-95e1-39e6d96bd90b	06:00 PM	10:00 PM	f	\N	app	\N	533	200
2313	584dca5d-c74e-4df9-87d7-8ec891ba1199	12:00 AM	11:59 PM	f	\N	app	\N	533	900
2317	4fc6ed1e-7c12-497b-8fdf-996e69eb81ef	06:00 PM	10:00 PM	f	\N	app	\N	534	200
2320	01d10fcc-069f-47d3-886f-330665705a76	10:00 AM	02:00 PM	f	\N	app	\N	535	350
2321	25748c64-5fc4-4635-b985-6adb1af93ff6	02:00 PM	06:00 PM	f	\N	app	\N	535	350
2322	ed30aefa-35af-4def-b673-c5aa769f064d	06:00 PM	10:00 PM	f	\N	app	\N	535	200
2323	b55b8b73-d844-4f73-9126-6f86578f7559	12:00 AM	11:59 PM	f	\N	app	\N	535	900
2324	b0f9231e-635b-4c50-815e-043af07c1a0b	06:00 AM	10:00 AM	f	\N	app	\N	536	200
2327	5c690aa6-dcca-4dd4-b9fb-88fa3f970570	06:00 PM	10:00 PM	f	\N	app	\N	536	200
2329	86b5358a-8f9c-496a-8d0e-93fe7170d8c0	06:00 AM	10:00 AM	f	\N	app	\N	537	200
2331	4efc2876-2381-4ede-89e0-9080c34065b7	02:00 PM	06:00 PM	f	\N	app	\N	537	350
2332	cb244679-fa0c-4c88-871d-743b7f78f5f5	06:00 PM	10:00 PM	f	\N	app	\N	537	200
2333	e0e69f90-7c57-4fbb-9070-e603dacf14ae	12:00 AM	11:59 PM	f	\N	app	\N	537	900
2334	10e31ecc-5f2b-46ff-b89c-e4063ce434ed	06:00 AM	10:00 AM	f	\N	app	\N	538	200
2335	a26c01a5-816d-42c6-b3de-e1e406dcadd7	10:00 AM	02:00 PM	f	\N	app	\N	538	350
2336	65ec5f9e-8257-4483-ab77-11044020bffd	02:00 PM	06:00 PM	f	\N	app	\N	538	350
2337	a57a209e-05b7-416e-8a40-51cb7407048e	06:00 PM	10:00 PM	f	\N	app	\N	538	200
2338	3439545b-ea97-4968-8930-32af89a2f441	12:00 AM	11:59 PM	f	\N	app	\N	538	900
2318	4c080aec-c188-43c4-bc80-f59fa630caa2	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	534	900
2314	37d3f56d-3594-41cd-8bef-abb1e7fca156	06:00 AM	10:00 AM	t	3	admin	2025-03-01 00:00:00	534	200
2341	d08af631-69c2-43e0-a8df-a5b030415898	06:00 AM	10:00 AM	f	\N	app	\N	541	200
2342	05e1d361-92f7-44a8-a3fe-2735ab7a53be	10:00 AM	02:00 PM	f	\N	app	\N	541	350
2343	4c34b0b8-25e9-45e9-b712-c0830df3144a	02:00 PM	06:00 PM	f	\N	app	\N	541	350
2344	a97108cc-5f89-494a-8de8-4e870434515e	06:00 PM	10:00 AM	f	\N	app	\N	541	200
2345	3a8f19f4-126c-40a6-ad1a-4f052e5342ca	12:00 AM	11:59 PM	f	\N	app	\N	541	900
2346	cbe6acf1-e920-485d-b5f1-03a28b8708db	06:00 AM	10:00 AM	f	\N	app	\N	542	200
2347	9cf2bcab-a3b1-43ff-9758-6f8671041dad	10:00 AM	02:00 PM	f	\N	app	\N	542	350
2348	c8432915-7663-409c-a7f1-c5235c7095f3	02:00 PM	06:00 PM	f	\N	app	\N	542	350
2350	337264c7-e8e4-4ac7-bf02-f968ac6502ab	12:00 AM	11:59 PM	f	\N	app	\N	542	900
2315	978e9b5d-cefd-40e8-8780-760248825f09	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	534	350
2316	16a99edc-4105-4f5c-b932-3eed746124a2	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	534	350
2330	573260d9-9dd9-46b7-9795-8734eb23b702	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	537	350
2305	b6146390-abd2-4bf4-87fd-2a3b27ca4d91	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	532	350
2306	c68fe2aa-ae21-4b76-b839-796a162821eb	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	532	350
2307	86786fe6-9be1-4ba2-b30f-f5835d1e4db8	06:00 PM	10:00 PM	t	3	admin	2025-03-01 00:00:00	532	200
2308	974cd5ae-5ab4-4e30-bf46-18bc92bd0b2f	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	532	900
2276	476bbf20-8ef1-49a7-8941-6942ef9cb3a2	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	526	350
2278	2ba1037c-c2d9-4538-8c58-c914ab37d26f	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	526	900
2325	878882bc-1630-4770-8867-d2cdca429cb2	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	536	350
2326	b16d0354-d81d-4eea-8df6-a1fbb9fc5025	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	536	350
2328	9f57bfd6-cae0-4e4c-8a2f-c603fad765de	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	536	900
2319	54baf5dc-546a-4c11-ab90-3cdf15a05988	06:00 AM	10:00 AM	t	3	app	2025-03-02 16:10:07.541	535	200
2349	1ae1fc95-ebde-4698-a9df-3da55ba537cf	06:00 PM	10:00 PM	f	\N	app	\N	542	200
2904	9a34940a-98a5-435d-9591-a7877ba18a5b	06:00 AM	10:00 AM	f	\N	app	\N	640	300
2351	ea78a63f-4329-4580-8f2f-2b88bac4052f	06:00 AM	10:00 AM	f	\N	app	\N	543	200
2352	4b630a74-6290-47fb-a45e-ecd0bb30a035	10:00 AM	02:00 PM	f	\N	app	\N	543	350
2353	971988b6-dd74-4ca8-9bfc-7999892ca10f	02:00 PM	06:00 PM	f	\N	app	\N	543	350
2355	3ad6f5ac-290f-4ca1-8d9d-281801a1489c	12:00 AM	11:59 PM	f	\N	app	\N	543	900
2356	baf4abf4-ce35-4fcc-8511-1c8ffc567b4d	06:00 AM	10:00 AM	f	\N	app	\N	544	200
2357	95d72047-769f-4d09-a12d-74cb26c07668	10:00 AM	02:00 PM	f	\N	app	\N	544	350
2358	2de354d2-bb24-420f-962e-a63082f200df	02:00 PM	06:00 PM	f	\N	app	\N	544	350
2360	ce289a79-68b3-4a18-baa9-6b7b5546857b	12:00 AM	11:59 PM	f	\N	app	\N	544	900
2366	6a58b9e3-c2ef-4f57-8ebb-4a0e1a943a90	06:00 AM	10:00 AM	f	\N	app	\N	546	200
2367	ca1f6be4-e158-496f-abb8-b80f1907b42e	10:00 AM	02:00 PM	f	\N	app	\N	546	350
2368	d31aa7a4-9b61-467f-b9d7-89c30661a2c4	02:00 PM	06:00 PM	f	\N	app	\N	546	350
2370	fd59aca9-36ed-4528-a2cd-a1874a2e29d7	12:00 AM	11:59 PM	f	\N	app	\N	546	900
2371	ef51948d-de91-40fe-bc72-1414bc5864f1	06:00 AM	10:00 AM	f	\N	app	\N	547	200
2372	c19b7017-6fa2-4fe5-bbce-dc9f57d28489	10:00 AM	02:00 PM	f	\N	app	\N	547	350
2373	0429c9e3-9a2b-45bc-a3a3-963ef4bd1621	02:00 PM	06:00 PM	f	\N	app	\N	547	350
2375	d1582e52-33de-49e1-931c-7cfb43d8e19b	12:00 AM	11:59 PM	f	\N	app	\N	547	900
2376	7688a5e7-80ab-491d-b8f3-9445e7f32fa7	06:00 AM	10:00 AM	f	\N	app	\N	548	200
2377	badabeb4-624d-476f-8923-e1a28a9b100e	10:00 AM	02:00 PM	f	\N	app	\N	548	350
2378	94f07361-3508-4b2d-87ae-257e31200ff7	02:00 PM	06:00 PM	f	\N	app	\N	548	350
2380	97e6f17a-77aa-4bb1-af06-0afba677f477	12:00 AM	11:59 PM	f	\N	app	\N	548	900
2381	ed97be47-49b9-4cd3-99d6-a6cef8637067	06:00 AM	10:00 AM	f	\N	app	\N	549	200
2382	48ba503d-5047-4207-a3f0-d0e79788b4e6	10:00 AM	02:00 PM	f	\N	app	\N	549	350
2383	ac458052-928d-4d34-acee-d0f9009f026a	02:00 PM	06:00 PM	f	\N	app	\N	549	350
2385	0961fa68-0430-4296-afb3-5719d5e83bbc	12:00 AM	11:59 PM	f	\N	app	\N	549	900
2386	0952bb5f-beb8-4410-8ec6-48f94a859145	06:00 AM	10:00 AM	f	\N	app	\N	550	200
2387	483a0784-4efc-4471-b46e-cfe0b9d64236	10:00 AM	02:00 PM	f	\N	app	\N	550	350
2388	131532e0-8460-484f-94e6-0451c9e3f4a1	02:00 PM	06:00 PM	f	\N	app	\N	550	350
2390	f4e61983-a650-4a1d-8e24-e1d48e405bdb	12:00 AM	11:59 PM	f	\N	app	\N	550	900
2391	f8deb79b-6508-48f9-a3ba-76ae9e4122be	06:00 AM	10:00 AM	f	\N	app	\N	551	200
2392	160ea7e7-5ad2-4b53-b1e9-3dd185578981	10:00 AM	02:00 PM	f	\N	app	\N	551	350
2393	a21fa316-13c1-4b36-ab42-41c9eae99ab7	02:00 PM	06:00 PM	f	\N	app	\N	551	350
2395	fc19431a-7ab4-498b-a13d-f727f0bdd4fc	12:00 AM	11:59 PM	f	\N	app	\N	551	900
2396	263c9d45-95e9-4b1d-9d00-e56012ea3ce8	06:00 AM	10:00 AM	f	\N	app	\N	552	200
2397	a5a68a42-9029-420d-b806-d18790fb5bdf	10:00 AM	02:00 PM	f	\N	app	\N	552	350
2398	938c45be-bf16-4c52-9b9f-71631f9f81c4	02:00 PM	06:00 PM	f	\N	app	\N	552	350
2400	12ec0464-7c1b-44c3-b661-78349d1a2cfe	12:00 AM	11:59 PM	f	\N	app	\N	552	900
2401	7c52034e-2033-41e8-ae6b-d05ca68adb80	06:00 AM	10:00 AM	f	\N	app	\N	553	200
2402	4f50bed9-3452-4c73-8c4b-22b87e67c4cb	10:00 AM	02:00 PM	f	\N	app	\N	553	350
2403	4b7f0f6f-bc88-42cf-91ad-c1c7c7307667	02:00 PM	06:00 PM	f	\N	app	\N	553	350
2405	c5ac115a-e20c-4cca-b728-4fafc350212f	12:00 AM	11:59 PM	f	\N	app	\N	553	900
2406	297866e6-5c73-4bfe-9ca4-e6a42ee1feb3	06:00 AM	10:00 AM	f	\N	app	\N	554	200
2412	e5394531-80ae-4b73-8782-c3a2425bbaad	10:00 AM	02:00 PM	f	\N	app	\N	555	350
2413	f82972c9-a121-4d94-bbc4-5fbe23467375	02:00 PM	06:00 PM	f	\N	app	\N	555	350
2415	21e5fecb-4d8e-4d59-b60a-64655bc92448	12:00 AM	11:59 PM	f	\N	app	\N	555	900
2416	e8229d4c-1121-4534-ae79-03c21796aea9	06:00 AM	10:00 AM	f	\N	app	\N	556	200
2417	2c5dfa94-d1b8-404b-89ba-a1390c30b737	10:00 AM	02:00 PM	f	\N	app	\N	556	350
2418	2695ead8-53db-456d-9718-8eac429590aa	02:00 PM	06:00 PM	f	\N	app	\N	556	350
2420	6e8ab696-b94c-4daf-b13d-77cc97242fca	12:00 AM	11:59 PM	f	\N	app	\N	556	900
2421	eaaa7e10-e752-4d44-b148-bb01762a467a	06:00 AM	10:00 AM	f	\N	app	\N	557	200
2425	fce87d95-a650-42fd-862c-7b5d3574cff7	12:00 AM	11:59 PM	f	\N	app	\N	557	900
2361	a524e742-1c97-4447-898c-4b80083422ae	06:00 AM	10:00 AM	t	3	admin	2025-02-01 00:00:00	545	200
2362	8f3e77ae-a5dc-4ccd-8fb0-f610501aeedc	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	545	350
2363	630f5ee5-afe8-49f7-a0be-89d92179bcc4	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	545	350
2407	0979c125-7e21-42ed-b3bf-b266ecc6ec89	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	554	350
2410	aaf7efd4-5273-4275-9f37-8197f808f14e	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	554	900
2408	bea0aee9-452f-4afd-be0d-9d091784ccf6	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	554	350
2426	3e0e3bbf-2e9a-4dda-8beb-3be3ed1050a5	06:00 AM	10:00 AM	f	\N	app	\N	558	200
2423	9c22b9a7-b134-4332-9cba-75f9a40fc9cd	02:00 PM	06:00 PM	t	3	admin	2025-04-02 00:00:00	557	350
2354	62869a8a-44b8-400b-b412-5e7cc227f379	06:00 PM	10:00 PM	f	\N	app	\N	543	200
2427	33cfcb3a-edab-4d9e-b93c-3291de796663	10:00 AM	02:00 PM	f	\N	app	\N	558	350
2428	5fb5331f-88f3-4a38-8813-9fbb9a53f228	02:00 PM	06:00 PM	f	\N	app	\N	558	350
2430	0a67b880-89c0-47e8-b62d-d997f9a28349	12:00 AM	11:59 PM	f	\N	app	\N	558	900
2431	c228badf-0ee3-4bba-9633-0fcaf3bd255e	06:00 AM	10:00 AM	f	\N	app	\N	559	200
2432	d9dc9dcd-1a3d-428e-8a60-c429073691e2	10:00 AM	02:00 PM	f	\N	app	\N	559	350
2435	0cae28cc-9f3b-478a-a6f6-853589992684	12:00 AM	11:59 PM	f	\N	app	\N	559	900
2436	c62cbd61-7341-4f8a-8ba0-3cc8c49d1844	06:00 AM	10:00 AM	f	\N	app	\N	560	200
2437	189ed2c9-7359-4134-bb57-b0e6153d1807	10:00 AM	02:00 PM	f	\N	app	\N	560	350
2438	214bfcfd-979b-401f-8750-ae80bbabda77	02:00 PM	06:00 PM	f	\N	app	\N	560	350
2440	630e3ead-e9fd-4eb4-93f1-87833545e5c2	12:00 AM	11:59 PM	f	\N	app	\N	560	900
2441	fb0225f1-5a1a-444e-b299-ca454063ba63	06:00 AM	10:00 AM	f	\N	app	\N	561	200
2442	29be72fd-adb1-4dcd-9f80-b7d6936f1c50	10:00 AM	02:00 PM	f	\N	app	\N	561	350
2443	464fe69a-0dd8-42a7-aa47-f9d57b7af349	02:00 PM	06:00 PM	f	\N	app	\N	561	350
2445	dbe23ab4-b203-4ba0-a9b8-c423028c6f80	12:00 AM	11:59 PM	f	\N	app	\N	561	900
2446	bd900f21-6993-40ce-8455-5f56824396d1	06:00 AM	10:00 AM	f	\N	app	\N	562	200
2451	39fddccc-d86d-464f-924f-43f122562493	06:00 AM	10:00 AM	f	\N	app	\N	563	200
2452	0f009794-fc86-47fa-95e3-63937eadea8e	10:00 AM	02:00 PM	f	\N	app	\N	563	350
2453	ae4f13c7-43fa-4859-b897-7c18dc25ca95	02:00 PM	06:00 PM	f	\N	app	\N	563	350
2454	f5062c53-69ff-477d-bd7a-eb0cc17082a6	06:00 PM	10:00 AM	f	\N	app	\N	563	200
2455	8b4d9ce5-ce0b-4e1e-a8f6-0c15a75bf7be	12:00 AM	11:59 PM	f	\N	app	\N	563	900
2456	75c7cd3d-509b-4ca7-a439-61dd54b23402	06:00 AM	10:00 AM	f	\N	app	\N	564	200
2459	61f6a613-51aa-446e-9e4a-4cad1027e328	06:00 PM	10:00 AM	f	\N	app	\N	564	200
2461	bdddaff3-7a84-42f5-bba8-a7021702a452	06:00 AM	10:00 AM	f	\N	app	\N	565	200
2462	686e4493-7919-486d-aecb-2a624f2582b6	10:00 AM	02:00 PM	f	\N	app	\N	565	350
2463	24c0203f-3c08-429e-9368-367eeeb333e6	02:00 PM	06:00 PM	f	\N	app	\N	565	350
2464	ac19057f-04fd-4de8-9ce1-e679ac260fe2	06:00 PM	10:00 AM	f	\N	app	\N	565	200
2465	e73d2f52-8284-4469-b1ce-7038cc417de4	12:00 AM	11:59 PM	f	\N	app	\N	565	900
2466	7493df54-d951-4f58-861a-a9cca82c0d77	06:00 AM	10:00 AM	f	\N	app	\N	566	200
2467	e8b0ec38-ebfa-497d-8d92-e3e0da390c04	10:00 AM	02:00 PM	f	\N	app	\N	566	350
2468	590a1ae8-b957-4fa6-b786-ead1c59023f8	02:00 PM	06:00 PM	f	\N	app	\N	566	350
2469	2af028ec-1716-4509-a9c8-01390cba4cd9	06:00 PM	10:00 AM	f	\N	app	\N	566	200
2470	53e32200-3808-4eed-b959-548da0bcf847	12:00 AM	11:59 PM	f	\N	app	\N	566	900
2471	c562d8be-5baa-417d-8f94-4eab32491740	06:00 AM	10:00 AM	f	\N	app	\N	567	200
2476	c5cf0cbe-1dd9-4c77-b091-35ae68089e6f	06:00 AM	10:00 AM	f	\N	app	\N	568	200
2477	fd819bfb-f530-4b62-a0cc-47fbb5089e55	10:00 AM	02:00 PM	f	\N	app	\N	568	350
2478	548097ee-bbb7-463b-b472-60ab5286ccb2	02:00 PM	06:00 PM	f	\N	app	\N	568	350
2479	e926d15e-51d1-4413-bef9-5c74df816b96	06:00 PM	10:00 AM	f	\N	app	\N	568	200
2480	315d495e-2abd-4dda-9396-c09712d70513	12:00 AM	11:59 PM	f	\N	app	\N	568	900
2481	fa684050-d669-4baa-9207-2468d104c1b9	06:00 AM	10:00 AM	f	\N	app	\N	569	200
2482	5a2e7ffa-01ad-41a9-92f7-72731b4e02b1	10:00 AM	02:00 PM	f	\N	app	\N	569	350
2483	2a338d8c-2402-4eab-9315-5770046a08cb	02:00 PM	06:00 PM	f	\N	app	\N	569	350
2484	0735e023-c0ea-445e-b620-d977bca90396	06:00 PM	10:00 AM	f	\N	app	\N	569	200
2485	e1985b0f-ee54-49d6-91e3-87d1aba89b43	12:00 AM	11:59 PM	f	\N	app	\N	569	900
2486	7cea1f0f-71f7-4ed4-8908-67ca49513a9c	06:00 AM	10:00 AM	f	\N	app	\N	570	200
2489	ca0454e5-fd32-46d6-ae3b-dce67f02549c	06:00 PM	10:00 AM	f	\N	app	\N	570	200
2490	cf034304-636a-4272-8bcb-61406cc8aa1b	12:00 AM	11:59 PM	f	\N	app	\N	570	900
2491	ae0a913b-9b6c-4ea1-8e7d-2316583e0fde	06:00 AM	10:00 AM	f	\N	app	\N	571	200
2492	39d50d21-b5c2-4ca0-859f-597b3302cafb	10:00 AM	02:00 PM	f	\N	app	\N	571	350
2493	c503a2f0-25f3-45e3-ae75-be4195649617	02:00 PM	06:00 PM	f	\N	app	\N	571	350
2494	d0dc7cdc-31c2-46a7-b5b2-223c012448c2	06:00 PM	10:00 AM	f	\N	app	\N	571	200
2495	f4495b8b-36bf-4e11-994a-384b44fbcf29	12:00 AM	11:59 PM	f	\N	app	\N	571	900
2447	b5b73297-e700-4326-a470-db09b792463b	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	562	350
2448	0c1aa8ae-c756-4ba9-a591-f5a55d3eeea6	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	562	350
2449	e05c9f18-629c-4bdc-a683-5f8437d6a2b3	06:00 PM	10:00 AM	t	3	admin	2025-03-01 00:00:00	562	200
2450	3824628a-434b-4e0a-a00d-129f1810a312	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	562	900
2457	d711802a-df92-4131-a500-601258ac1805	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	564	350
2458	9cfadcdb-1999-47c9-8bd5-4f09368c94cc	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	564	350
2460	e89a9a6d-9b44-4aaa-972d-1fcb6fdb971d	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	564	900
2472	3c898b96-1da6-4655-8f33-1355e2f83956	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	567	350
2473	31f6b3c3-cb91-40c8-ba77-f117d10e52dd	02:00 PM	06:00 PM	t	3	admin	2025-03-01 00:00:00	567	350
2474	930514d4-f952-4075-a362-a5ff480e000a	06:00 PM	10:00 AM	t	3	admin	2025-03-01 00:00:00	567	200
2475	2d626b97-e0a9-49b7-a5fb-20f984b27c42	12:00 AM	11:59 PM	t	3	admin	2025-03-01 00:00:00	567	900
2487	76f9fdef-46d5-4307-ba89-70a3f6b8eeb7	10:00 AM	02:00 PM	t	3	admin	2025-03-01 00:00:00	570	350
2488	8a80c9b8-4af9-453a-9ca7-93feeb17be49	02:00 PM	06:00 PM	t	3	admin	2025-03-20 00:00:00	570	350
2905	e10c198a-97e7-44be-b09a-3eb7c24de523	10:00 AM	02:00 PM	f	\N	app	\N	640	300
2906	86b01812-3888-4030-9396-771d1b7e0d24	02:00 PM	06:00 PM	f	\N	app	\N	640	300
2907	b7947e2b-6178-4a25-a4f7-9c144275475e	06:00 PM	10:00 PM	f	\N	app	\N	640	300
2998	d0554e23-9a3f-4f25-8727-d1f4b0c95e8d	06:00 PM	06:00 AM	f	\N	app	\N	658	700
2999	8c271486-a82d-407c-8fb2-101083a00e8c	06:00 AM	10:00 AM	f	\N	app	\N	659	300
2444	27d1de79-e034-46dd-98d9-2770a8f82d71	06:00 PM	10:00 PM	f	\N	app	\N	561	200
3000	a675251e-db12-4652-adc8-3c5122bb7e5c	10:00 AM	02:00 PM	f	\N	app	\N	659	300
3001	56a4c3f9-6bea-450d-850f-e8e0f56ea4c4	02:00 PM	06:00 PM	f	\N	app	\N	659	300
3002	8be3c43b-a970-456b-a134-4418cd6fe968	06:00 PM	10:00 PM	f	\N	app	\N	659	300
3003	c83616fb-3205-4adc-8ff2-815aab674af1	06:00 PM	06:00 AM	f	\N	app	\N	659	700
3004	f4763223-a2b3-4c9e-aa25-e85e270634c8	06:00 AM	10:00 AM	f	\N	app	\N	660	300
3005	657c1409-6c64-42b4-8092-d473dc2e0468	10:00 AM	02:00 PM	f	\N	app	\N	660	300
3006	5218e391-e560-40c0-9d50-c6d331056524	02:00 PM	06:00 PM	f	\N	app	\N	660	300
3007	c76a5725-ed3b-4d13-854a-548e93be18ee	06:00 PM	10:00 PM	f	\N	app	\N	660	300
3008	7e4e9783-5974-45dc-b563-5bfbbfa1e616	06:00 PM	06:00 AM	f	\N	app	\N	660	700
3009	a531f2f6-a7e4-4471-8b2b-f8cdfcdd094e	06:00 AM	10:00 AM	f	\N	app	\N	661	300
3010	15632f0c-132d-4037-aea3-44367c05be15	10:00 AM	02:00 PM	f	\N	app	\N	661	300
3011	f34056ae-c512-49a8-93fb-c60c7df1a072	02:00 PM	06:00 PM	f	\N	app	\N	661	300
3012	4e792da8-df02-46a6-a9fb-fe848010499f	06:00 PM	10:00 PM	f	\N	app	\N	661	300
3013	13e840ca-e2c4-43f7-bd08-4ea49f94c6c7	06:00 PM	06:00 AM	f	\N	app	\N	661	700
3014	b1528465-01be-4642-a243-1fcc31dbf575	06:00 AM	10:00 AM	f	\N	app	\N	662	300
3015	98b6781f-6871-4a43-bc51-c8add91b7911	10:00 AM	02:00 PM	f	\N	app	\N	662	300
3016	82c9287f-ac51-44a2-be35-02d5a5e6a1a4	02:00 PM	06:00 PM	f	\N	app	\N	662	300
3017	c4e16f41-98a5-4ffc-83dc-9f1dd981e65c	06:00 PM	10:00 PM	f	\N	app	\N	662	300
3018	a746533c-f0b3-4dc8-a2eb-3b11daa22cc2	06:00 PM	06:00 AM	f	\N	app	\N	662	700
3019	b889af44-88e7-4743-840b-ce3442dbcc92	06:00 AM	10:00 AM	f	\N	app	\N	663	300
3020	ecca31e5-31dc-43ec-9706-6ddf586c5074	10:00 AM	02:00 PM	f	\N	app	\N	663	300
3021	d93c932d-c8c4-4c63-84fb-9c3e7e4cae83	02:00 PM	06:00 PM	f	\N	app	\N	663	300
3022	922c1593-9f11-4361-9f8c-77d9e629328b	06:00 PM	10:00 PM	f	\N	app	\N	663	300
3023	b7112448-57d5-42b0-85cd-14ebfedb1770	06:00 PM	06:00 AM	f	\N	app	\N	663	700
3024	e54b473a-dacb-4e6b-993e-3cfc7de78f77	06:00 AM	10:00 AM	f	\N	app	\N	664	300
3025	c85eaedd-7020-4e0f-85a8-fd01f51b198f	10:00 AM	02:00 PM	f	\N	app	\N	664	300
3026	6826b055-8f20-4300-9235-9c68d6d20af3	02:00 PM	06:00 PM	f	\N	app	\N	664	300
3027	41749af5-7164-4c0e-9e5b-62cf7376575b	06:00 PM	10:00 PM	f	\N	app	\N	664	300
3028	4f793678-5331-4a4c-9cea-7f871c4ae794	06:00 PM	06:00 AM	f	\N	app	\N	664	700
3029	32e0d4fc-370c-431c-9771-519f8b92e6b1	06:00 AM	10:00 AM	f	\N	app	\N	665	300
3030	81ee0140-c31f-4bc9-b55e-e318bc78e673	10:00 AM	02:00 PM	f	\N	app	\N	665	300
3031	8e130ff7-60d0-468f-bf77-fd2d7e81bef4	02:00 PM	06:00 PM	f	\N	app	\N	665	300
3032	ffef9f30-764c-4b18-869d-dace4c2e8141	06:00 PM	10:00 PM	f	\N	app	\N	665	300
3033	2eac2043-1762-40d5-bf74-d0481c30ecd3	06:00 PM	06:00 AM	f	\N	app	\N	665	700
3034	f56e8eca-58f0-4de7-a8a3-1a00d131991a	06:00 AM	10:00 AM	f	\N	app	\N	666	300
3035	2766fbc4-181f-48a4-a892-6492421bc062	10:00 AM	02:00 PM	f	\N	app	\N	666	300
3036	94b4bcef-0be0-4385-b056-2d87d157842a	02:00 PM	06:00 PM	f	\N	app	\N	666	300
3037	b2c21a6e-eaa5-43de-a33a-9b7f4dbf7878	06:00 PM	10:00 PM	f	\N	app	\N	666	300
3038	cd22e35c-90cf-48b7-9617-ae2d7ddce561	06:00 PM	06:00 AM	f	\N	app	\N	666	700
3039	5ffc1356-d9ec-4de5-929a-3da57caf9328	06:00 AM	10:00 AM	f	\N	app	\N	667	300
3040	b9247678-fd4f-4058-9638-7eaa590fd5b7	10:00 AM	02:00 PM	f	\N	app	\N	667	300
3041	cad8b8be-288e-4763-bace-e44e92cc4b68	02:00 PM	06:00 PM	f	\N	app	\N	667	300
3042	700a1f02-b618-4935-bd84-13ca852fe5c8	06:00 PM	10:00 PM	f	\N	app	\N	667	300
3043	baa3473c-5dc9-4c8f-808a-2f62dca32617	06:00 PM	06:00 AM	f	\N	app	\N	667	700
3044	f4d21e29-aaf0-4d99-8f5d-d48ab53628d9	06:00 AM	10:00 AM	f	\N	app	\N	668	300
3045	1f3ba05e-6c76-4eea-85e1-d8d424e05f93	10:00 AM	02:00 PM	f	\N	app	\N	668	300
3046	03880584-8ee5-48d7-8fe6-de38f543e40a	02:00 PM	06:00 PM	f	\N	app	\N	668	300
3047	b2cd4cd8-cbfe-40a6-b53f-2a64daa6f566	06:00 PM	10:00 PM	f	\N	app	\N	668	300
3048	5597184d-3bf5-41c0-8aaf-0f0e48a034fd	06:00 PM	06:00 AM	f	\N	app	\N	668	700
3049	1877f57e-09ad-4295-a09b-277af263e331	06:00 AM	10:00 AM	f	\N	app	\N	669	300
3050	343d7dd0-53d0-4e80-81da-3dfb532e7525	10:00 AM	02:00 PM	f	\N	app	\N	669	300
3051	a7f99c3e-854f-4c38-a064-796d67365186	02:00 PM	06:00 PM	f	\N	app	\N	669	300
3052	9ba0af31-7a80-47d1-b2c3-37a6e39955e1	06:00 PM	10:00 PM	f	\N	app	\N	669	300
3053	72ce542b-192b-4365-b742-057792b43fe2	06:00 PM	06:00 AM	f	\N	app	\N	669	700
3054	d9d2a096-eb60-4991-a1ad-20a6239d1ceb	06:00 AM	10:00 AM	f	\N	app	\N	670	300
3055	51e697b1-4326-429b-8570-f4eda7ae3104	10:00 AM	02:00 PM	f	\N	app	\N	670	300
3056	5bdf0dd4-237e-48ee-8359-70e0d74cde86	02:00 PM	06:00 PM	f	\N	app	\N	670	300
3057	c0b126e4-8649-4271-b712-d9b5c6b95b4b	06:00 PM	10:00 PM	f	\N	app	\N	670	300
3058	c9f328b8-eec2-4b31-bb49-27bcfa99b1ea	06:00 PM	06:00 AM	f	\N	app	\N	670	700
3059	d9628bce-5cdc-4387-b79b-4e13f7b4a31e	06:00 AM	10:00 AM	f	\N	app	\N	671	300
3060	3213019b-20ec-480b-9357-f5180ca28a76	10:00 AM	02:00 PM	f	\N	app	\N	671	300
3061	cca40abb-3844-4e38-b18d-413a804fe159	02:00 PM	06:00 PM	f	\N	app	\N	671	300
3062	a33a260a-5367-4fbf-bc8e-4fce9a0085ce	06:00 PM	10:00 PM	f	\N	app	\N	671	300
3063	a9745e29-bb9d-43f7-adb0-9c3b52a5dd45	06:00 PM	06:00 AM	f	\N	app	\N	671	700
3064	e6c4d578-91fa-47fc-9c48-fa8d843d5bf0	06:00 AM	10:00 AM	f	\N	app	\N	672	300
3065	0617a95c-4261-450a-93e4-37b28fdd07df	10:00 AM	02:00 PM	f	\N	app	\N	672	300
3066	e83e938b-b861-4f80-b64d-cb5ffc334d70	02:00 PM	06:00 PM	f	\N	app	\N	672	300
3067	672152a3-b0a4-4248-b2b3-7861638bad61	06:00 PM	10:00 PM	f	\N	app	\N	672	300
3068	f608414c-3a7b-44c9-b951-0361233d85cd	06:00 PM	06:00 AM	f	\N	app	\N	672	700
3069	b5bc2be4-5c58-4a77-9f53-ba13db8e2cc4	06:00 AM	10:00 AM	f	\N	app	\N	673	300
3070	24875f04-9d3a-471e-84a7-29d796b3107f	10:00 AM	02:00 PM	f	\N	app	\N	673	300
3071	41a5341a-ed8b-4a53-ac4a-a8e778105eef	02:00 PM	06:00 PM	f	\N	app	\N	673	300
3072	394752a2-c540-41bd-ba09-c8bddd2e6633	06:00 PM	10:00 PM	f	\N	app	\N	673	300
3073	29d25901-25f2-401a-85a6-97a17f3db6a9	06:00 PM	06:00 AM	f	\N	app	\N	673	700
3074	059d1096-1462-4df6-b9b2-2c6aa14e1f66	06:00 AM	10:00 AM	f	\N	app	\N	674	300
3075	d9dd9665-fc68-49e5-9650-458cfb2c32f2	10:00 AM	02:00 PM	f	\N	app	\N	674	300
3076	1cbdc042-4674-4e47-ae5a-c9abe9d8a5bc	02:00 PM	06:00 PM	f	\N	app	\N	674	300
3077	8ad283d1-c730-477f-ac1d-8efed955a099	06:00 PM	10:00 PM	f	\N	app	\N	674	300
3078	06ef45ff-3d3b-4170-ada3-026f2e64779b	06:00 PM	06:00 AM	f	\N	app	\N	674	700
3079	2fb05c2a-282a-4490-a2c5-be68d5e2ad70	06:00 AM	10:00 AM	f	\N	app	\N	675	300
3080	af30138d-ef03-4620-8d45-4f4591101440	10:00 AM	02:00 PM	f	\N	app	\N	675	300
3081	20deff3b-90a6-467d-ac3a-2e7e701cb464	02:00 PM	06:00 PM	f	\N	app	\N	675	300
3082	ef6b3cf4-2f5f-46aa-b986-8cb818bd2d41	06:00 PM	10:00 PM	f	\N	app	\N	675	300
3083	a89ea65d-6db6-4172-b302-870f64d7a96e	06:00 PM	06:00 AM	f	\N	app	\N	675	700
3084	10f561a0-91a9-4905-9453-ad6f142b6461	06:00 AM	10:00 AM	f	\N	app	\N	676	300
3085	d9a8f171-69e0-486b-8dff-9f045dfd95ee	10:00 AM	02:00 PM	f	\N	app	\N	676	300
3086	64d55ff9-1ba9-481d-b21d-d06fae3810fb	02:00 PM	06:00 PM	f	\N	app	\N	676	300
3087	1fb42b6d-9993-48b4-9c55-2ed37535b564	06:00 PM	10:00 PM	f	\N	app	\N	676	300
3088	5dd41a05-176d-49d7-a616-6aa0fe30d642	06:00 PM	06:00 AM	f	\N	app	\N	676	700
3089	a02df2a3-9dc1-4702-a032-b52e886106a0	06:00 AM	10:00 AM	f	\N	app	\N	677	300
3090	932eccf7-9b00-4d65-83fa-4f5d6ec7f252	10:00 AM	02:00 PM	f	\N	app	\N	677	300
3091	96d0eeff-8e31-4922-aa57-276b03b2b9e5	02:00 PM	06:00 PM	f	\N	app	\N	677	300
3092	d0b5c761-b89c-4e90-8a49-8b0d7231e7bb	06:00 PM	10:00 PM	f	\N	app	\N	677	300
3093	8a3f5143-ab54-4b0e-9ff6-da9822e10b76	06:00 PM	06:00 AM	f	\N	app	\N	677	700
3094	bd60e293-4d43-428d-a360-a86a147f02ec	06:00 AM	10:00 AM	f	\N	app	\N	678	300
3095	0b0fcc55-ea62-4cc1-aa2b-eba96123ec90	10:00 AM	02:00 PM	f	\N	app	\N	678	300
3096	f405d8c2-4274-4816-9d26-715aba624941	02:00 PM	06:00 PM	f	\N	app	\N	678	300
3097	dd9ef77e-5c95-4456-924a-bf1a3be80aad	06:00 PM	10:00 PM	f	\N	app	\N	678	300
3098	b071edcc-f38b-4d79-9c5b-2262cd1882f1	06:00 PM	06:00 AM	f	\N	app	\N	678	700
3099	6ceeb621-b427-4f21-899e-51b8a8de5816	06:00 AM	10:00 AM	f	\N	app	\N	679	300
3100	923fad3f-4dcb-4f23-b9e5-1e826cb0e6cb	10:00 AM	02:00 PM	f	\N	app	\N	679	300
3101	05371715-2bef-4831-a045-f4eeb21c3c87	02:00 PM	06:00 PM	f	\N	app	\N	679	300
3102	9f3b8dde-7f45-4ad5-b6fe-364b4f7df23c	06:00 PM	10:00 PM	f	\N	app	\N	679	300
3103	ef4c4b61-16dc-45a1-a8a2-913fec3e28ba	06:00 PM	06:00 AM	f	\N	app	\N	679	700
3104	a45b8444-a39a-4b8d-931f-d170789ce56d	06:00 AM	10:00 AM	f	\N	app	\N	680	300
3105	8d5a2cbb-0f76-4f41-81e1-7099d73fcd41	10:00 AM	02:00 PM	f	\N	app	\N	680	300
3106	0e0c32e3-1a32-4d2e-8f72-8d5cc7565795	02:00 PM	06:00 PM	f	\N	app	\N	680	300
3107	65762e80-541d-495f-b6ea-f6e75875831c	06:00 PM	10:00 PM	f	\N	app	\N	680	300
3108	6126abba-6588-43e0-af38-3148a40dc5db	06:00 PM	06:00 AM	f	\N	app	\N	680	700
3109	28d82a42-b3cf-4826-93e4-ed0d74f09b18	06:00 AM	10:00 AM	f	\N	app	\N	681	300
3110	e048cb6a-ee5f-4f80-b3ab-edb62a1fd5df	10:00 AM	02:00 PM	f	\N	app	\N	681	300
3111	9830ef16-ce1b-4b95-9670-67862e556d6c	02:00 PM	06:00 PM	f	\N	app	\N	681	300
3112	4512d508-2db0-4be4-b95c-c83ca9e75ac1	06:00 PM	10:00 PM	f	\N	app	\N	681	300
3113	e51573f6-196e-4cfc-b29a-071b29b877d6	06:00 PM	06:00 AM	f	\N	app	\N	681	700
3114	d97c25a9-2cf7-4a88-924c-e3178efbcce8	06:00 AM	10:00 AM	f	\N	app	\N	682	300
3115	c75f3165-d3c9-4134-adc6-0101b9b02b98	10:00 AM	02:00 PM	f	\N	app	\N	682	300
3116	5aab5756-7574-44c6-bbe9-83a79186a960	02:00 PM	06:00 PM	f	\N	app	\N	682	300
3117	2974a870-19ee-4e00-9a99-9be14d7eea37	06:00 PM	10:00 PM	f	\N	app	\N	682	300
3118	470fd1cc-066b-4e91-85a9-f1a073ad2458	06:00 PM	06:00 AM	f	\N	app	\N	682	700
3119	708c12eb-c8a9-422c-8453-0fb50eae9516	06:00 AM	10:00 AM	f	\N	app	\N	683	300
3120	84336d41-c593-49f6-96e2-0d5146fc1fc3	10:00 AM	02:00 PM	f	\N	app	\N	683	300
3121	36038cdf-253f-4bcc-8811-6cf5c6b6a5c6	02:00 PM	06:00 PM	f	\N	app	\N	683	300
3122	0d616b8c-14c7-46d1-9bc1-d10f93b0adb5	06:00 PM	10:00 PM	f	\N	app	\N	683	300
3123	e8f9ab59-e04c-4f3f-8577-6ec1c1325c59	06:00 PM	06:00 AM	f	\N	app	\N	683	700
3124	01360f00-3c69-4578-9e98-38e6bcb7ddc8	06:00 AM	10:00 AM	f	\N	app	\N	684	300
3125	1dd9d5a5-be3a-4862-9d26-5a408dde3d15	10:00 AM	02:00 PM	f	\N	app	\N	684	300
3126	adb5fad2-3817-4aeb-8ba7-a3fa6d78afdc	02:00 PM	06:00 PM	f	\N	app	\N	684	300
3127	8c41ca12-878b-461e-8587-c5951b03ff08	06:00 PM	10:00 PM	f	\N	app	\N	684	300
3128	d4cba50f-7daf-4a1e-81d6-92b23ebdc5f0	06:00 PM	06:00 AM	f	\N	app	\N	684	700
3129	70fedbdc-959b-4916-9c54-38687d8561dd	06:00 AM	10:00 AM	f	\N	app	\N	685	300
3130	0a72e7ab-e84e-4f80-881f-844d8392929e	10:00 AM	02:00 PM	f	\N	app	\N	685	300
3131	3f902e97-2cc1-41b1-a481-4bbd675cdadd	02:00 PM	06:00 PM	f	\N	app	\N	685	300
3132	9563faac-d80f-4983-a15d-317ddbd721fe	06:00 PM	10:00 PM	f	\N	app	\N	685	300
3133	ac124581-127d-40e0-ac6b-e03eee6d176e	06:00 PM	06:00 AM	f	\N	app	\N	685	700
3134	c481161a-ecd3-46e3-8fe9-9f1924af807d	06:00 AM	10:00 AM	f	\N	app	\N	686	300
3135	5455e7fd-8598-4499-9d28-dbeaae0b48cf	10:00 AM	02:00 PM	f	\N	app	\N	686	300
3136	ff890929-84b5-432a-8b85-feb82b461b4e	02:00 PM	06:00 PM	f	\N	app	\N	686	300
3137	a942ec78-52a0-4fcb-846f-f4357d062996	06:00 PM	10:00 PM	f	\N	app	\N	686	300
3138	c03f7f31-dcf8-43ee-a845-d36d6cfe7cab	06:00 PM	06:00 AM	f	\N	app	\N	686	700
3139	535e08cc-088e-40be-9e3b-70b6f327e358	06:00 AM	10:00 AM	f	\N	app	\N	687	300
3140	8e96a083-835f-4472-a8e1-237085afa6ed	10:00 AM	02:00 PM	f	\N	app	\N	687	300
3141	3c282caf-4b20-4da4-bb70-470f533fbe1c	02:00 PM	06:00 PM	f	\N	app	\N	687	300
3142	06d1d48a-484c-4579-aa18-796bba763cd0	06:00 PM	10:00 PM	f	\N	app	\N	687	300
3143	a7f412a9-7387-43ad-83d2-40ef66bfc0fc	06:00 PM	06:00 AM	f	\N	app	\N	687	700
3144	cd33aed1-735b-4e77-ae38-59d56981aa5e	06:00 AM	10:00 AM	f	\N	app	\N	688	300
3145	7ec3cc4c-1862-4806-b179-8edc6c225fa2	10:00 AM	02:00 PM	f	\N	app	\N	688	300
3146	361b12cc-bf62-407b-a3e6-6bfc45f0a382	02:00 PM	06:00 PM	f	\N	app	\N	688	300
3147	b44929e1-7a65-4744-ab30-396db385f5ac	06:00 PM	10:00 PM	f	\N	app	\N	688	300
3148	edc02f9b-a5e2-48ea-8213-706c58d42196	06:00 PM	06:00 AM	f	\N	app	\N	688	700
3149	eb7dbf4e-0edb-4a07-889a-782eac09cfee	06:00 AM	10:00 AM	f	\N	app	\N	689	300
3150	a4b3f7cd-bb33-4d03-a997-dc81f7771976	10:00 AM	02:00 PM	f	\N	app	\N	689	300
3151	56e10bd7-1d10-4d43-bb4e-41eed1c11950	02:00 PM	06:00 PM	f	\N	app	\N	689	300
3152	14064bdc-59b7-4d7d-91fc-dd215feee0d8	06:00 PM	10:00 PM	f	\N	app	\N	689	300
3153	00ab0d61-0a9f-4647-89f3-fc0a5559d074	06:00 PM	06:00 AM	f	\N	app	\N	689	700
3154	a1bf0045-e9ad-4653-9052-292f84a67825	06:00 AM	10:00 AM	f	\N	app	\N	690	300
3155	8285b64d-596e-4dd8-9db9-c89e29f13ed2	10:00 AM	02:00 PM	f	\N	app	\N	690	300
3156	37150083-a97c-472f-8ab7-db4a83be177c	02:00 PM	06:00 PM	f	\N	app	\N	690	300
3157	2151db64-942a-42a1-979b-49275de1c8f9	06:00 PM	10:00 PM	f	\N	app	\N	690	300
3158	7f9a40c3-5907-46a6-a803-feab85baf840	06:00 PM	06:00 AM	f	\N	app	\N	690	700
3159	12c299d0-6147-4cb7-b88e-6fecdb1793e9	06:00 AM	10:00 AM	f	\N	app	\N	691	300
3160	23f35d49-cb7f-4db4-bfb2-be6a1f399690	10:00 AM	02:00 PM	f	\N	app	\N	691	300
3161	09740777-119c-4942-bc53-82893d5a1167	02:00 PM	06:00 PM	f	\N	app	\N	691	300
3162	7caf7c57-2b72-4d9b-a5f5-90f43622f1f0	06:00 PM	10:00 PM	f	\N	app	\N	691	300
3163	0dfdb3d6-23a0-4c07-a83b-6360eccaba01	06:00 PM	06:00 AM	f	\N	app	\N	691	700
3164	f7a8ef6f-c43d-45dc-ac1a-c9fb118ec3f1	06:00 AM	10:00 AM	f	\N	app	\N	692	300
3165	bf3d8dff-62c1-4af6-9a6a-e710355b6823	10:00 AM	02:00 PM	f	\N	app	\N	692	300
3166	f2b9e747-a236-4c24-ba98-7bb84e815cd9	02:00 PM	06:00 PM	f	\N	app	\N	692	300
3167	81f49087-9426-4f4e-9264-3344825749bd	06:00 PM	10:00 PM	f	\N	app	\N	692	300
3168	8748bfaa-3264-423e-a8a1-4f261bdf9224	06:00 PM	06:00 AM	f	\N	app	\N	692	700
3169	805ed5c4-871f-4d7d-a0a6-d03a120f441d	06:00 AM	10:00 AM	f	\N	app	\N	693	300
3170	25eca616-960b-438f-8bab-ddb4b91c2997	10:00 AM	02:00 PM	f	\N	app	\N	693	300
3171	9cc84123-636d-4755-9c0c-3d32dc6a2288	02:00 PM	06:00 PM	f	\N	app	\N	693	300
3172	ee06d506-83cb-4260-b3a9-94c02d114d48	06:00 PM	10:00 PM	f	\N	app	\N	693	300
3173	45780cfa-6458-4495-bcb1-f5e496c89fc9	06:00 PM	06:00 AM	f	\N	app	\N	693	700
3174	32c7456a-2559-444e-aa38-68a7b05d6547	06:00 AM	10:00 AM	f	\N	app	\N	694	300
3175	80284d4d-6740-48d3-ad0b-25257a9e5402	10:00 AM	02:00 PM	f	\N	app	\N	694	300
3176	63968ff7-768e-40a4-943a-ba5709ef0dd8	02:00 PM	06:00 PM	f	\N	app	\N	694	300
3177	bb7155cc-dc4e-43e7-aa69-2429f547496d	06:00 PM	10:00 PM	f	\N	app	\N	694	300
3178	ea8490b1-642e-4fb5-9478-08049575f3f8	06:00 PM	06:00 AM	f	\N	app	\N	694	700
3179	53fbcf37-3f70-4582-81ac-2e3b59bc20a3	06:00 AM	10:00 AM	f	\N	app	\N	695	300
3180	abfd976a-0428-4f32-9576-efae56b62197	10:00 AM	02:00 PM	f	\N	app	\N	695	300
3181	c113831e-b47d-45a3-bf37-aae3a5495b16	02:00 PM	06:00 PM	f	\N	app	\N	695	300
3182	f7c042ad-66c5-4a73-b384-b37a71aae949	06:00 PM	10:00 PM	f	\N	app	\N	695	300
3183	95ec589f-5a7d-440c-97a7-f941e65cd818	06:00 PM	06:00 AM	f	\N	app	\N	695	700
3184	2064efd4-a6e7-4105-918d-74e4f5c211d3	06:00 AM	10:00 AM	f	\N	app	\N	696	300
3185	2296d358-6b2d-4488-a470-e7d794ab831c	10:00 AM	02:00 PM	f	\N	app	\N	696	300
3186	104170a8-5f6d-4b35-92d3-82f3e0f324af	02:00 PM	06:00 PM	f	\N	app	\N	696	300
3187	c9168c24-0970-436e-9a7b-b04341eda824	06:00 PM	10:00 PM	f	\N	app	\N	696	300
3188	51cfb8b5-32d2-4e71-957b-25d3c872af5a	06:00 PM	06:00 AM	f	\N	app	\N	696	700
3189	5f59e9ed-ec5d-4a89-9297-af03263d2b66	06:00 AM	10:00 AM	f	\N	app	\N	697	300
3190	97965603-9fab-4461-a377-36187c39d38b	10:00 AM	02:00 PM	f	\N	app	\N	697	300
3191	431fd3d8-40ff-4a57-9167-85ca6db4893d	02:00 PM	06:00 PM	f	\N	app	\N	697	300
3192	e6b9f7fc-365e-4e93-8b7a-b52005ee0981	06:00 PM	10:00 PM	f	\N	app	\N	697	300
3193	948c884a-e7fc-4b0f-a6f6-c0567f0a5ac3	06:00 PM	06:00 AM	f	\N	app	\N	697	700
3194	a74ed32d-6c06-4374-b120-c1f9c49452b3	06:00 AM	10:00 AM	f	\N	app	\N	698	300
3195	3c836138-c8ff-4b9f-9c98-3e994d5282c5	10:00 AM	02:00 PM	f	\N	app	\N	698	300
3196	732527f0-33ed-468e-a1b5-6891754f3267	02:00 PM	06:00 PM	f	\N	app	\N	698	300
3197	4269853f-6b4a-4437-a9a1-0c412e8971fe	06:00 PM	10:00 PM	f	\N	app	\N	698	300
3198	8b02aa0a-2bfb-401f-bffc-a592c060f3bb	06:00 PM	06:00 AM	f	\N	app	\N	698	700
3199	d543a997-2fcb-4668-b65b-174d4c8e26d8	06:00 AM	10:00 AM	f	\N	app	\N	699	300
3200	7ce30cff-1c63-439f-9c70-6da1f7d775e4	10:00 AM	02:00 PM	f	\N	app	\N	699	300
3201	8f2d03b7-5ff2-483b-aa4c-defe022ce768	02:00 PM	06:00 PM	f	\N	app	\N	699	300
3202	f4ef3d4f-b1c1-4442-b62d-59119d63fae8	06:00 PM	10:00 PM	f	\N	app	\N	699	300
3203	798fd481-68e9-4516-909d-14d2f5a8b6d5	06:00 PM	06:00 AM	f	\N	app	\N	699	700
3204	f705e90f-4d09-4931-be5d-3fa9a3e0f970	06:00 AM	10:00 AM	f	\N	app	\N	700	300
3205	76ee1c45-2534-4568-92f5-9cadd3417ae2	10:00 AM	02:00 PM	f	\N	app	\N	700	300
3206	0c0b7c19-70ae-45cd-bf37-8b257ce4fed5	02:00 PM	06:00 PM	f	\N	app	\N	700	300
3207	fff1b2ce-f61e-4cdf-bdd8-8d08515e2e3d	06:00 PM	10:00 PM	f	\N	app	\N	700	300
3208	f7f55f1f-478d-475b-84f5-c11874c31d8b	06:00 PM	06:00 AM	f	\N	app	\N	700	700
3209	250a32e0-0b72-4465-85c8-e6bbb68f4a88	06:00 AM	10:00 AM	f	\N	app	\N	701	300
3210	2510bc6a-995c-43a4-adde-bb5963eb7f4c	10:00 AM	02:00 PM	f	\N	app	\N	701	300
3211	b4d8a748-81bc-464f-a02f-e22846b45882	02:00 PM	06:00 PM	f	\N	app	\N	701	300
3212	dd306e4f-b65b-4837-8849-5c1d682122cb	06:00 PM	10:00 PM	f	\N	app	\N	701	300
3213	47bcf6ac-d6d8-47f0-8854-360b36583aef	06:00 PM	06:00 AM	f	\N	app	\N	701	700
3214	c97023a4-ee96-489c-8c2b-ca57544d0744	06:00 AM	10:00 AM	f	\N	app	\N	702	300
3215	3a59ebfc-a7a9-4489-bb53-ad18d36a2aa2	10:00 AM	02:00 PM	f	\N	app	\N	702	300
3216	1657d67c-01d6-4892-ad83-08ebc3ff0051	02:00 PM	06:00 PM	f	\N	app	\N	702	300
3217	d8c000bf-6cfd-4bb4-9ed2-093b23ceb651	06:00 PM	10:00 PM	f	\N	app	\N	702	300
3218	46247fb4-ebe9-4430-b2b2-dee508a65c09	06:00 PM	06:00 AM	f	\N	app	\N	702	700
3219	98b1659e-f1d0-4d05-a6c9-be32b5e4d508	06:00 AM	10:00 AM	f	\N	app	\N	703	300
3220	73480b79-1b8a-49ca-adf6-4ede0d5c7b81	10:00 AM	02:00 PM	f	\N	app	\N	703	300
3221	b91221b4-b1b3-4e02-9890-7d49ca1ebe1a	02:00 PM	06:00 PM	f	\N	app	\N	703	300
3222	37176d2c-b104-4720-81bc-761c9fa90e63	06:00 PM	10:00 PM	f	\N	app	\N	703	300
3223	d720fb00-d645-442d-947b-cc22949fe5a5	06:00 PM	06:00 AM	f	\N	app	\N	703	700
3224	2c7ec60d-90dd-4286-8951-aeb4d36d9477	06:00 AM	10:00 AM	f	\N	app	\N	704	300
3225	986c8298-beae-40e7-a38c-3fd670bf7f6e	10:00 AM	02:00 PM	f	\N	app	\N	704	300
3226	d568150a-7cf1-48c8-b2c5-f4a00235091a	02:00 PM	06:00 PM	f	\N	app	\N	704	300
3227	35aa7d13-6bd8-496b-b4dc-409e951856d7	06:00 PM	10:00 PM	f	\N	app	\N	704	300
3228	7b7e2df5-03af-4d25-8ace-7cadc866a57d	06:00 PM	06:00 AM	f	\N	app	\N	704	700
3229	1f80033b-e8a0-475d-8f1f-2f990e95c803	06:00 AM	10:00 AM	f	\N	app	\N	705	300
3230	45980aaa-5198-4fa9-8511-d0300c0b5861	10:00 AM	02:00 PM	f	\N	app	\N	705	300
3231	0b89598c-82e7-46e6-b110-e62166f2aa1d	02:00 PM	06:00 PM	f	\N	app	\N	705	300
3232	a09e44da-1cd2-475f-8642-504ad25e1edf	06:00 PM	10:00 PM	f	\N	app	\N	705	300
3233	93a9ddbf-54cf-4228-8682-df0b3b044ba5	06:00 PM	06:00 AM	f	\N	app	\N	705	700
3234	63778837-2d35-40f2-b11c-f18b3d98c2f5	06:00 AM	10:00 AM	f	\N	app	\N	706	300
3235	8c4cd269-28b7-40a9-a45f-20b9c3608381	10:00 AM	02:00 PM	f	\N	app	\N	706	300
3236	8e9a206b-9165-44e1-9846-ccbf1f440eef	02:00 PM	06:00 PM	f	\N	app	\N	706	300
3237	e45654ea-14a2-494e-88e1-eb4c80f8f3ea	06:00 PM	10:00 PM	f	\N	app	\N	706	300
3238	f2d9f38b-37fc-4143-a913-ff35deee5de8	06:00 PM	06:00 AM	f	\N	app	\N	706	700
3239	2998f22c-74c7-4540-b3f9-df9b960a3b3f	06:00 AM	10:00 AM	f	\N	app	\N	707	300
3240	7b58a3fe-3a74-47a9-b2fb-cc8f1bb14e45	10:00 AM	02:00 PM	f	\N	app	\N	707	300
3241	0ebbf6c2-4996-406d-83ad-416dc1a24967	02:00 PM	06:00 PM	f	\N	app	\N	707	300
3242	f821ed6b-a94f-4a5c-b1fb-dd9057532810	06:00 PM	10:00 PM	f	\N	app	\N	707	300
3243	b659186d-43c5-4beb-ac12-0e8fc1689216	06:00 PM	06:00 AM	f	\N	app	\N	707	700
3244	7647f5f9-6d5d-4cf0-bdfd-5ed1b181c0f9	06:00 AM	10:00 AM	f	\N	app	\N	708	300
3245	afa38fb8-723d-4618-a903-d3ac8bc84bed	10:00 AM	02:00 PM	f	\N	app	\N	708	300
3246	50562a7d-078a-4396-baf6-8efc53227574	02:00 PM	06:00 PM	f	\N	app	\N	708	300
3247	dcacd3a0-1b60-4480-a5aa-45e86fe1e8f8	06:00 PM	10:00 PM	f	\N	app	\N	708	300
3248	4322bae5-72a7-4d5f-b690-0194c6508c28	06:00 PM	06:00 AM	f	\N	app	\N	708	700
3249	22239e2f-d416-4e79-a2e8-082b6b8e2ce1	06:00 AM	10:00 AM	f	\N	app	\N	709	300
3250	0c15f1cf-6e91-4275-8580-ac26ab454e4e	10:00 AM	02:00 PM	f	\N	app	\N	709	300
3251	134246d4-f604-445b-96a3-dda0a79f23cb	02:00 PM	06:00 PM	f	\N	app	\N	709	300
3252	78e2c5d5-d2e1-4c3b-a953-37f327275865	06:00 PM	10:00 PM	f	\N	app	\N	709	300
3253	7e73e00b-36ea-452e-95b9-33c6834e93da	06:00 PM	06:00 AM	f	\N	app	\N	709	700
3254	c2e26433-06a1-4b0b-b868-1fa6c7f29175	06:00 AM	10:00 AM	f	\N	app	\N	710	300
3255	a199c773-a616-4552-b30a-d97182872b13	10:00 AM	02:00 PM	f	\N	app	\N	710	300
3256	cf420278-7d01-4c10-914f-e0c68875bff8	02:00 PM	06:00 PM	f	\N	app	\N	710	300
3257	cc7b43c7-8800-4a00-97d4-97988cc80d34	06:00 PM	10:00 PM	f	\N	app	\N	710	300
3258	de645961-5447-45de-be44-bc6c2aa1d021	06:00 PM	06:00 AM	f	\N	app	\N	710	700
3259	205c0d66-216d-4d56-b414-e1b2b2139113	06:00 AM	10:00 AM	f	\N	app	\N	711	300
3260	c414d1f4-2cce-4487-9830-80576ca995de	10:00 AM	02:00 PM	f	\N	app	\N	711	300
3261	80c14f50-337e-4fb8-8e0d-ced0be28a00f	02:00 PM	06:00 PM	f	\N	app	\N	711	300
3262	8b56113d-4aa8-4e2c-a98c-913e4bded9bc	06:00 PM	10:00 PM	f	\N	app	\N	711	300
3263	5ced7196-590c-4967-a4b3-cff0d27beff0	06:00 PM	06:00 AM	f	\N	app	\N	711	700
3264	1c9591c3-1165-4453-8807-e836b0512ebf	06:00 AM	10:00 AM	f	\N	app	\N	712	300
3265	a34b8c6f-eef9-43f0-9aed-d7802002666a	10:00 AM	02:00 PM	f	\N	app	\N	712	300
3266	3529af2f-cc63-4d23-aedc-5330141e8a83	02:00 PM	06:00 PM	f	\N	app	\N	712	300
3267	0d87cfdc-76aa-42e7-a3a7-6934be9cabdf	06:00 PM	10:00 PM	f	\N	app	\N	712	300
3268	e12505a3-b82c-4aaf-b969-c97daba688bf	06:00 PM	06:00 AM	f	\N	app	\N	712	700
3269	2278a2a0-67f6-4dcd-b3b7-c5010c3066ee	06:00 AM	10:00 AM	f	\N	app	\N	713	300
3270	4001a5af-1bdb-4a96-a547-3916100846e6	10:00 AM	02:00 PM	f	\N	app	\N	713	300
3271	aee217f5-40e0-41fc-a336-4e76038a44fc	02:00 PM	06:00 PM	f	\N	app	\N	713	300
3272	cf377ad2-8fa9-4074-9078-f4d4c07c3136	06:00 PM	10:00 PM	f	\N	app	\N	713	300
3273	d73d9976-a5d0-40b9-9614-b500f658efee	06:00 PM	06:00 AM	f	\N	app	\N	713	700
3274	cac36d8c-14cc-4c99-a459-83d40705793e	06:00 AM	10:00 AM	f	\N	app	\N	714	300
3275	e669d5b5-ca34-4869-b565-64ed439b32d1	10:00 AM	02:00 PM	f	\N	app	\N	714	300
3276	d94b7406-dbf1-4e56-8a45-d5c364330ae6	02:00 PM	06:00 PM	f	\N	app	\N	714	300
3277	11406d79-96c6-4615-89ac-3b14286e9b85	06:00 PM	10:00 PM	f	\N	app	\N	714	300
3278	4d556e65-03ac-472f-a489-3ae180a134f3	06:00 PM	06:00 AM	f	\N	app	\N	714	700
3279	391c3b69-5062-4450-9f1e-ddf2163dadb7	06:00 AM	10:00 AM	f	\N	app	\N	715	300
3280	7e131a6c-c3c1-4419-acd7-9e467d795f80	10:00 AM	02:00 PM	f	\N	app	\N	715	300
3281	5e6596a7-2060-402d-a5e5-a2606f087461	02:00 PM	06:00 PM	f	\N	app	\N	715	300
3282	8f3c3a5b-50c5-4721-b921-2757205dd3d0	06:00 PM	10:00 PM	f	\N	app	\N	715	300
3283	1689e2b5-3de7-4075-a7b8-e0c84b2562e5	06:00 PM	06:00 AM	f	\N	app	\N	715	700
3284	b24a995a-4bea-4611-b4dc-703c31c42462	06:00 AM	10:00 AM	f	\N	app	\N	716	300
3285	1488efa4-4f9d-44a1-a2ec-083eebd523f1	10:00 AM	02:00 PM	f	\N	app	\N	716	300
3286	70698b84-2b96-4177-a37f-ecd3a2d918bd	02:00 PM	06:00 PM	f	\N	app	\N	716	300
3287	24ba289c-a51e-4c81-9da8-cc62fb1d3215	06:00 PM	10:00 PM	f	\N	app	\N	716	300
3288	6e46fc3f-7d25-4b51-87d7-9fab86e86692	06:00 PM	06:00 AM	f	\N	app	\N	716	700
3289	80f524dc-faa7-4c4f-b0a9-96c8ffcd1bea	06:00 AM	10:00 AM	f	\N	app	\N	717	200
3290	cc97e21a-a0df-49a0-9134-d2704c2f8d7e	10:00 AM	02:00 PM	f	\N	app	\N	717	250
3291	c8215651-28a4-4484-8fdb-7f14fd895801	02:00 PM	06:00 PM	f	\N	app	\N	717	250
3292	9b80e57e-07d9-429a-9d41-b90677eaeabc	06:00 PM	10:00 PM	f	\N	app	\N	717	200
3293	3bdd815a-d067-4710-95fd-22b23b94aaf9	10:00 PM	05:00 AM	f	\N	app	\N	717	200
3294	a3cfff66-4d57-4a30-8385-e15391616486	06:00 AM	10:00 AM	f	\N	app	\N	718	200
3295	f17acb7a-b6f2-43ac-94eb-c0ea6f28f004	10:00 AM	02:00 PM	f	\N	app	\N	718	250
3296	3c745c19-7dde-4572-bedb-1488eb3b0c17	02:00 PM	06:00 PM	f	\N	app	\N	718	250
3297	95552083-8c42-43c3-b057-b7653d2aba7a	06:00 PM	10:00 PM	f	\N	app	\N	718	200
3298	24af84dc-1f09-42b9-8060-0eb854947f2a	10:00 PM	05:00 AM	f	\N	app	\N	718	200
3299	daaecde1-e7eb-4ab0-bd7b-4813b6f693e9	06:00 AM	10:00 AM	f	\N	app	\N	719	200
3300	ba08dd4c-92da-488d-a642-34d701cf7947	10:00 AM	02:00 PM	f	\N	app	\N	719	250
3301	4a8f4b51-0d23-43df-a038-ca17a8d069fa	02:00 PM	06:00 PM	f	\N	app	\N	719	250
3302	df1bc0df-143d-4da3-ac00-a970d4079208	06:00 PM	10:00 PM	f	\N	app	\N	719	200
3303	e7c853f1-862c-4634-b024-efbf2f16f908	10:00 PM	05:00 AM	f	\N	app	\N	719	200
3304	3bad6c3c-1f3a-4150-8456-bb3bc5589e57	06:00 AM	10:00 AM	f	\N	app	\N	720	200
3305	5353422f-256d-4cdd-90fe-97e74035bc00	10:00 AM	02:00 PM	f	\N	app	\N	720	250
3306	390258c8-3536-4aec-8e15-b40d4377b151	02:00 PM	06:00 PM	f	\N	app	\N	720	250
3307	c769f90e-fbcf-407a-b310-c6d73db99030	06:00 PM	10:00 PM	f	\N	app	\N	720	200
3308	b81965d6-321b-427b-86b0-e33d8cddd4a6	10:00 PM	05:00 AM	f	\N	app	\N	720	200
3309	90ab917f-3df0-4894-8de3-e6a098809258	06:00 AM	10:00 AM	f	\N	app	\N	721	200
3310	51c7deed-cb47-468d-bded-50a8b5461b43	10:00 AM	02:00 PM	f	\N	app	\N	721	250
3311	c1b95136-0b58-4142-ba5e-211f4aa28d56	02:00 PM	06:00 PM	f	\N	app	\N	721	250
3312	3a3417d4-7dd2-42db-a729-0b5967ab2b64	06:00 PM	10:00 PM	f	\N	app	\N	721	200
3313	5dfc9ac8-b41e-48c6-8826-15bc836ddcf2	10:00 PM	05:00 AM	f	\N	app	\N	721	200
3314	99c5758b-e79e-4915-84a5-62b555ffdc22	06:00 AM	10:00 AM	f	\N	app	\N	722	200
3315	3b003072-7e27-47d4-ba9d-4a68f00d04b1	10:00 AM	02:00 PM	f	\N	app	\N	722	250
3316	05b4f7d6-22af-4175-ab3d-9d6bed5dd6b2	02:00 PM	06:00 PM	f	\N	app	\N	722	250
3317	d2717e8a-e39e-4a1e-b4e4-b188c6050710	06:00 PM	10:00 PM	f	\N	app	\N	722	200
3318	0a0da926-5ff0-48f1-a074-c3c861671c29	10:00 PM	05:00 AM	f	\N	app	\N	722	200
3319	e3c8d013-4b5c-4436-a5cc-838a781f8807	06:00 AM	10:00 AM	f	\N	app	\N	723	200
3320	91bc2987-645d-4db1-9b88-495f3a4096fd	10:00 AM	02:00 PM	f	\N	app	\N	723	250
3321	ec3846f9-26b8-4ff7-99ba-9ffa3c3b764b	02:00 PM	06:00 PM	f	\N	app	\N	723	250
3322	5d560504-9a7c-4027-843d-2f1a82a08a45	06:00 PM	10:00 PM	f	\N	app	\N	723	200
3323	b3a616a0-8382-49a7-986e-040e8c603170	10:00 PM	05:00 AM	f	\N	app	\N	723	200
3324	df5c9096-27ec-49e1-9062-79fdd740e764	06:00 AM	10:00 AM	f	\N	app	\N	724	200
3325	95af418a-abbf-4bef-a7b9-d3aa99b1636d	10:00 AM	02:00 PM	f	\N	app	\N	724	250
3326	aaeb39b0-dfa1-4309-98d5-4d963816ac7b	02:00 PM	06:00 PM	f	\N	app	\N	724	250
3327	d6a2d62e-41ec-4264-af78-69bd332f4843	06:00 PM	10:00 PM	f	\N	app	\N	724	200
3328	79f51d84-5a48-421e-878d-b2d23cb96556	10:00 PM	05:00 AM	f	\N	app	\N	724	200
3329	4a20a62e-45c9-4518-80de-927865a23d84	06:00 AM	10:00 AM	f	\N	app	\N	725	200
3330	27c8141d-572d-477a-88e5-54120a408cb8	10:00 AM	02:00 PM	f	\N	app	\N	725	250
3331	2f03fad8-c762-4c7c-b596-9e60840652f5	02:00 PM	06:00 PM	f	\N	app	\N	725	250
3332	1652a51a-dd96-4a23-9dee-19e0b2dcc059	06:00 PM	10:00 PM	f	\N	app	\N	725	200
3333	d3b60183-a9b5-4324-8340-f2ac9d715718	10:00 PM	05:00 AM	f	\N	app	\N	725	200
3334	69e8152c-c4f0-48db-808b-afe75ba2f951	06:00 AM	10:00 AM	f	\N	app	\N	726	200
3335	66ad4da5-f972-45be-80bc-f21603e119d6	10:00 AM	02:00 PM	f	\N	app	\N	726	250
3336	3c1c4f9a-04dd-4b91-8993-1095c61ef64c	02:00 PM	06:00 PM	f	\N	app	\N	726	250
3337	ec78cef8-d041-49e5-ab3c-fc2add12606b	06:00 PM	10:00 PM	f	\N	app	\N	726	200
3338	b41d888c-e901-48b9-8682-2eb68f601718	10:00 PM	05:00 AM	f	\N	app	\N	726	200
3339	04945769-ad4f-4f5d-b7c4-560131c9c249	06:00 AM	10:00 AM	f	\N	app	\N	727	200
3340	de97d040-318a-4372-9d6e-e3c8ff10f7ee	10:00 AM	02:00 PM	f	\N	app	\N	727	250
3341	b8073156-4308-44d6-8815-e13f44513e5c	02:00 PM	06:00 PM	f	\N	app	\N	727	250
3342	c4550740-d78c-409d-bf5e-b4db682554cc	06:00 PM	10:00 PM	f	\N	app	\N	727	200
3343	9f1c5f4e-b697-4a73-8ec8-b591af9d261e	10:00 PM	05:00 AM	f	\N	app	\N	727	200
3344	6a781dea-7eea-43ca-b36e-c712ffd4f0db	06:00 AM	10:00 AM	f	\N	app	\N	728	200
3345	52a63a24-ed57-49ea-9a1c-7da49efa8059	10:00 AM	02:00 PM	f	\N	app	\N	728	250
3346	eb365ce5-40d0-4954-a29a-397c31fc1a3a	02:00 PM	06:00 PM	f	\N	app	\N	728	250
3347	a3b99ac7-fc16-416f-a984-fedba8d13a0b	06:00 PM	10:00 PM	f	\N	app	\N	728	200
3348	431ac437-a6f8-459c-a71a-9b0af8eafd19	10:00 PM	05:00 AM	f	\N	app	\N	728	200
3354	2701e395-d59b-4b0b-81f2-92b7dd460613	06:00 AM	10:00 AM	f	\N	app	\N	730	200
3355	6c0fdc86-be8a-4dcc-bc06-d64d94183a9d	10:00 AM	02:00 PM	f	\N	app	\N	730	250
3356	3d6b5c2a-82dc-4bb6-a332-fd439d6bd956	02:00 PM	06:00 PM	f	\N	app	\N	730	250
3357	55f21f5f-fafb-4950-9dea-c4867c2d3638	06:00 PM	10:00 PM	f	\N	app	\N	730	200
3358	e29f7ccb-f667-4127-9d5e-9e5387fd1fbb	10:00 PM	05:00 AM	f	\N	app	\N	730	200
3359	3870fe72-9b67-4194-bbe6-7569f3cf489c	06:00 AM	10:00 AM	f	\N	app	\N	731	200
3360	860c4e06-6592-4dbc-af2a-8e95b3d40639	10:00 AM	02:00 PM	f	\N	app	\N	731	250
3361	4659024e-d1fd-4f30-a177-079ddf2dfdb2	02:00 PM	06:00 PM	f	\N	app	\N	731	250
3362	4b9f8936-6264-4e1a-b696-4630f290c23f	06:00 PM	10:00 PM	f	\N	app	\N	731	200
3363	6be8a3c1-c912-4fb6-80c1-b4b32b78e09e	10:00 PM	05:00 AM	f	\N	app	\N	731	200
3364	370d8663-d22d-492c-a8ae-a7419c2eaa96	06:00 AM	10:00 AM	f	\N	app	\N	732	200
3365	54474887-a563-4224-8cc7-892405dc18b5	10:00 AM	02:00 PM	f	\N	app	\N	732	250
3366	3a6ab63e-086f-488d-b88f-9f1a4ca5a22e	02:00 PM	06:00 PM	f	\N	app	\N	732	250
3367	ec8c8f57-631b-4b35-92dd-cd421c7f4234	06:00 PM	10:00 PM	f	\N	app	\N	732	200
3368	14b06d3e-d1d2-4b7e-8c33-93ba76c9f2d7	10:00 PM	05:00 AM	f	\N	app	\N	732	200
3369	0ecf3c79-6248-4281-a679-a11b18abf946	06:00 AM	10:00 AM	f	\N	app	\N	733	200
3370	aa99d82e-7315-4c96-950d-8c2af22e5ea9	10:00 AM	02:00 PM	f	\N	app	\N	733	250
3371	e358d6dd-b587-4f95-9b14-ebfd48c5a94b	02:00 PM	06:00 PM	f	\N	app	\N	733	250
3372	0d616143-1728-4f3c-883c-42d8b6d637a2	06:00 PM	10:00 PM	f	\N	app	\N	733	200
3373	8423ae31-ee93-41cc-a23e-bf72a6693c96	10:00 PM	05:00 AM	f	\N	app	\N	733	200
3374	d4c2b172-d76d-41e5-9388-a07f9e9a4aa5	06:00 AM	10:00 AM	f	\N	app	\N	734	200
3375	b61f86b7-4488-41b8-a81c-c49767ad9dcc	10:00 AM	02:00 PM	f	\N	app	\N	734	250
3376	20a6662a-a25d-4b9a-818d-516fb623fc94	02:00 PM	06:00 PM	f	\N	app	\N	734	250
3377	a36c48e6-372e-4227-8950-606f53a8d631	06:00 PM	10:00 PM	f	\N	app	\N	734	200
3378	a1fedea0-d0f5-4062-a54e-80f247a4e293	10:00 PM	05:00 AM	f	\N	app	\N	734	200
3379	aef0eb9b-70cc-430f-9527-bb9f68725167	06:00 AM	10:00 AM	f	\N	app	\N	735	200
3380	0b079758-5042-4b9a-9a6c-96252d6625d8	10:00 AM	02:00 PM	f	\N	app	\N	735	250
3381	26f03188-3074-4db3-b982-edba3d923a27	02:00 PM	06:00 PM	f	\N	app	\N	735	250
3382	b58e9cdc-f458-4bcd-8482-a2c818118286	06:00 PM	10:00 PM	f	\N	app	\N	735	200
3383	9a6da225-cc12-4e29-8b50-86e65c54dc13	10:00 PM	05:00 AM	f	\N	app	\N	735	200
3384	837a454e-4c8c-45f5-9fdb-aeaea6714a43	06:00 AM	10:00 AM	f	\N	app	\N	736	200
3385	147f4161-a7f8-4520-a545-e6cce8658299	10:00 AM	02:00 PM	f	\N	app	\N	736	250
3386	a2d8dab4-9bae-489d-a3f9-11263bc12ff3	02:00 PM	06:00 PM	f	\N	app	\N	736	250
3387	ef12eb61-7796-4999-9183-f099963658ce	06:00 PM	10:00 PM	f	\N	app	\N	736	200
3388	1ea22673-aeb7-4b4a-a0af-970d1ef41845	10:00 PM	05:00 AM	f	\N	app	\N	736	200
3389	d07721c4-fd4e-41a8-83bb-3f431d93b660	06:00 AM	10:00 AM	f	\N	app	\N	737	200
3390	9b194f10-9302-45c1-b37e-503eb7c57dd4	10:00 AM	02:00 PM	f	\N	app	\N	737	250
3391	8d521429-a40d-42c9-904d-4024d930ac61	02:00 PM	06:00 PM	f	\N	app	\N	737	250
3392	57f77e73-08da-42cd-bfaf-b20ec6a637cc	06:00 PM	10:00 PM	f	\N	app	\N	737	200
3393	f3574900-7adb-40cd-9881-ada2da837275	10:00 PM	05:00 AM	f	\N	app	\N	737	200
3394	d8068802-e011-41ff-8151-81a17be476b1	06:00 AM	10:00 AM	f	\N	app	\N	738	200
3395	ff8aa5ba-06bb-4e9c-a68e-dd33e9ba137c	10:00 AM	02:00 PM	f	\N	app	\N	738	250
3396	d8ee14c0-b4a1-459c-b2c1-6d4c324af132	02:00 PM	06:00 PM	f	\N	app	\N	738	250
3397	bbbde74f-bb1e-4c29-aaf7-37d468490ffe	06:00 PM	10:00 PM	f	\N	app	\N	738	200
3398	500bd882-87c7-49fa-98f4-88813d677c25	10:00 PM	05:00 AM	f	\N	app	\N	738	200
3399	e4aaa23f-0304-410d-b6b7-1ec85ed53133	06:00 AM	10:00 AM	f	\N	app	\N	739	200
3400	2413c7fa-9f83-464f-bc57-2e2594df63a3	10:00 AM	02:00 PM	f	\N	app	\N	739	250
3401	efc4ff97-872b-4eea-98ae-6ef378267cac	02:00 PM	06:00 PM	f	\N	app	\N	739	250
3402	171fb498-d4e6-4de5-9a39-feeb1d213914	06:00 PM	10:00 PM	f	\N	app	\N	739	200
3403	d74be815-27d8-47c6-9ce6-69fae3cef0b1	10:00 PM	05:00 AM	f	\N	app	\N	739	200
3404	8d0cd7b5-cef5-4985-9bff-98c0f4f253b7	06:00 AM	10:00 AM	f	\N	app	\N	740	200
3405	b5381868-d21f-4c64-ba74-4406607b7883	10:00 AM	02:00 PM	f	\N	app	\N	740	250
3406	1834c0d2-70bc-4868-8906-3c216f03f29b	02:00 PM	06:00 PM	f	\N	app	\N	740	250
3407	ca4b3eb5-73e4-4525-be97-0aef7da9de8f	06:00 PM	10:00 PM	f	\N	app	\N	740	200
3408	a40ef0be-6d2a-4645-89d5-fa2a4aa40c40	10:00 PM	05:00 AM	f	\N	app	\N	740	200
3409	3d5b9a24-bc35-46e7-83ab-5a8f2722bf16	06:00 AM	10:00 AM	f	\N	app	\N	741	200
3410	ff9d10c6-ea49-4878-9e9c-22191583508b	10:00 AM	02:00 PM	f	\N	app	\N	741	250
3411	55cdc8a3-61a8-476b-be8a-b9786ea849d2	02:00 PM	06:00 PM	f	\N	app	\N	741	250
3412	f7222a82-4917-4cbb-bbe4-a5f696e6a518	06:00 PM	10:00 PM	f	\N	app	\N	741	200
3413	beff04c6-7eec-4977-aa47-cf2fab5059cd	10:00 PM	05:00 AM	f	\N	app	\N	741	200
3414	b9b52443-a64d-40d7-af08-1541fa6ea83b	06:00 AM	10:00 AM	f	\N	app	\N	742	200
3415	ee2b32d6-24a7-4dac-b000-5dd4a475a450	10:00 AM	02:00 PM	f	\N	app	\N	742	250
3416	77829b3d-06ff-49ff-9c8d-974c75ba57f7	02:00 PM	06:00 PM	f	\N	app	\N	742	250
3417	54a1fdb0-4ee6-44fa-b0e6-2bee6dc21e0f	06:00 PM	10:00 PM	f	\N	app	\N	742	200
3418	07f68345-4383-4db6-ac98-ea324c4d0332	10:00 PM	05:00 AM	f	\N	app	\N	742	200
3419	bbba44c5-4dc9-4910-8e4e-f3f6cd6fa22a	06:00 AM	10:00 AM	f	\N	app	\N	743	200
3420	6417615c-3c4c-49c7-8c3c-2b152d9428a7	10:00 AM	02:00 PM	f	\N	app	\N	743	250
3421	fdef6a84-a85f-46a1-a800-6eafffb9cb1b	02:00 PM	06:00 PM	f	\N	app	\N	743	250
3422	9a2746a0-d18c-4e5b-9c74-56fa3707b28e	06:00 PM	10:00 PM	f	\N	app	\N	743	200
3423	a387626f-a991-4e4b-8d8f-8000238d1c07	10:00 PM	05:00 AM	f	\N	app	\N	743	200
3424	267dfdf1-6fd9-4d9c-9ba9-2833651ecaae	06:00 AM	10:00 AM	f	\N	app	\N	744	200
3425	7f952136-8338-4210-a076-3510c8657224	10:00 AM	02:00 PM	f	\N	app	\N	744	250
3426	bc2ed7dd-552c-4124-bcce-7baf147cdca1	02:00 PM	06:00 PM	f	\N	app	\N	744	250
3427	3e86a8e9-44be-450b-b519-adef801d038a	06:00 PM	10:00 PM	f	\N	app	\N	744	200
3428	a611483a-5d78-4c3a-9e67-3018051f6361	10:00 PM	05:00 AM	f	\N	app	\N	744	200
3429	7247302f-ef87-491b-a375-ce8f7f62bcc9	06:00 AM	10:00 AM	f	\N	app	\N	745	200
3430	9d59514d-59d3-45ff-b089-c81287436094	10:00 AM	02:00 PM	f	\N	app	\N	745	250
3431	65ad84b2-6b27-4543-980e-7d41f64ae745	02:00 PM	06:00 PM	f	\N	app	\N	745	250
3432	a51dfb2a-a9cb-4fdc-ace1-9c338f954565	06:00 PM	10:00 PM	f	\N	app	\N	745	200
3433	5c08e687-68f0-464a-8672-68ca70dd6ea2	10:00 PM	05:00 AM	f	\N	app	\N	745	200
3434	c3232f3f-2e69-487b-95e4-abc7dbd08054	06:00 AM	10:00 AM	f	\N	app	\N	746	200
3435	4cf498a3-3c91-4c07-8a8e-dd98e3f74b84	10:00 AM	02:00 PM	f	\N	app	\N	746	250
3436	dd13d320-4a03-4cda-9739-7bf9843a3162	02:00 PM	06:00 PM	f	\N	app	\N	746	250
3437	eafa63e0-1b4d-4ed0-8b09-68f39dc31ff2	06:00 PM	10:00 PM	f	\N	app	\N	746	200
3438	eb290b8c-9d0d-4b34-9c31-3eccc27229a4	10:00 PM	05:00 AM	f	\N	app	\N	746	200
3439	f67833fb-fcc0-4a99-bcf2-540569c6fe0f	06:00 AM	10:00 AM	f	\N	app	\N	747	200
3440	c897d7d9-ebed-4355-a530-bfa0e0944b84	10:00 AM	02:00 PM	f	\N	app	\N	747	250
3441	2c56eef8-c0cb-4213-b36b-72e097a5db29	02:00 PM	06:00 PM	f	\N	app	\N	747	250
3442	13f516b5-2a64-4ab9-8524-05a6f35b11c8	06:00 PM	10:00 PM	f	\N	app	\N	747	200
3443	bf4237cc-7331-4db5-ad37-6d941c5afb55	10:00 PM	05:00 AM	f	\N	app	\N	747	200
3444	44ee3b85-deb6-4eb6-9ca4-7de9bafb5d72	06:00 AM	10:00 AM	f	\N	app	\N	748	200
3445	7bfedaaf-8402-4238-8c76-e4a65de1259e	10:00 AM	02:00 PM	f	\N	app	\N	748	250
3446	36a31984-4822-4654-b708-b4b8447b10c3	02:00 PM	06:00 PM	f	\N	app	\N	748	250
3447	18b4298b-f102-4d32-8daa-33c999229927	06:00 PM	10:00 PM	f	\N	app	\N	748	200
3448	e561d66a-cac9-4fd1-adf3-7c7d9ab4a3b9	10:00 PM	05:00 AM	f	\N	app	\N	748	200
3449	2ade8093-b07e-4c83-95c9-1e75902710a0	06:00 AM	10:00 AM	f	\N	app	\N	749	200
3450	f19afcfd-b246-4bcc-af0f-2f96f496613d	10:00 AM	02:00 PM	f	\N	app	\N	749	250
3451	8a2f3683-4629-4047-8858-5214c018e3e3	02:00 PM	06:00 PM	f	\N	app	\N	749	250
3452	17909e09-25e3-4d56-9e88-5d741a7868cf	06:00 PM	10:00 PM	f	\N	app	\N	749	200
3453	2f8909cb-478b-485f-98a5-92ed2cbfaab1	10:00 PM	05:00 AM	f	\N	app	\N	749	200
3454	57cf9d4d-d00d-4f19-a827-f458639119d6	06:00 AM	10:00 AM	f	\N	app	\N	750	200
3455	55b74b82-4df5-4690-acef-f6d176d01c4a	10:00 AM	02:00 PM	f	\N	app	\N	750	250
3456	2f5c0583-c660-4636-93ec-c25a92232388	02:00 PM	06:00 PM	f	\N	app	\N	750	250
3457	3775f23c-76ee-4aba-a7ef-084454ec68f5	06:00 PM	10:00 PM	f	\N	app	\N	750	200
3458	42392d4c-d46b-4b7e-9660-04a6dc2ca233	10:00 PM	05:00 AM	f	\N	app	\N	750	200
3459	422f1ecd-bea7-40bc-82a5-c37c7902b729	06:00 AM	10:00 AM	f	\N	app	\N	751	200
3460	68bbf5b8-2c34-4628-b3e8-8eecbdfd5f4d	10:00 AM	02:00 PM	f	\N	app	\N	751	250
3461	5fbd6adc-a454-4dd8-a821-1ab9871d6218	02:00 PM	06:00 PM	f	\N	app	\N	751	250
3462	f0355378-bc9c-4a7f-bc4e-2e0ec4876560	06:00 PM	10:00 PM	f	\N	app	\N	751	200
3463	66fb41cd-51d8-4040-8966-12aa2c6c76de	10:00 PM	05:00 AM	f	\N	app	\N	751	200
3464	d93a88a9-8855-4b28-8361-6e088cddaed2	06:00 AM	10:00 AM	f	\N	app	\N	752	200
3465	41426d68-f6ac-4cf7-b090-eb1c42568b89	10:00 AM	02:00 PM	f	\N	app	\N	752	250
3466	a121e69b-f85a-4968-845f-e551065239bc	02:00 PM	06:00 PM	f	\N	app	\N	752	250
3467	8e2b1241-3009-46d0-9d23-8be41883af4e	06:00 PM	10:00 PM	f	\N	app	\N	752	200
3468	6e881bab-d203-4899-837e-759b562fe602	10:00 PM	05:00 AM	f	\N	app	\N	752	200
3469	fa850fd3-51bc-4b95-ba24-db043dc76f84	06:00 AM	10:00 AM	f	\N	app	\N	753	200
3470	a3856d57-9585-4c5c-b266-2f5b47dcea35	10:00 AM	02:00 PM	f	\N	app	\N	753	250
3471	084c65bb-9e9a-426d-a237-ec9fc36ddfe1	02:00 PM	06:00 PM	f	\N	app	\N	753	250
3472	22e859c2-e419-4070-bfe7-2e797e3398fe	06:00 PM	10:00 PM	f	\N	app	\N	753	200
3473	c929ac40-300c-4cb2-aafc-88425fc906f1	10:00 PM	05:00 AM	f	\N	app	\N	753	200
3474	6eb37c88-d761-49b6-b3f4-89bc00758096	06:00 AM	10:00 AM	f	\N	app	\N	754	200
3475	fea1158d-a809-4787-adf0-96429a7f3cf7	10:00 AM	02:00 PM	f	\N	app	\N	754	250
3476	28128c96-f5af-4017-8f7b-7953645ecfd7	02:00 PM	06:00 PM	f	\N	app	\N	754	250
3477	dd73c20a-c270-406c-af96-73e85c65afd4	06:00 PM	10:00 PM	f	\N	app	\N	754	200
3478	03aa19c3-d171-400f-b3c0-74a450d647fd	10:00 PM	05:00 AM	f	\N	app	\N	754	200
3479	786035e5-676d-455a-b204-3dc3cffa9a53	06:00 AM	10:00 AM	f	\N	app	\N	755	200
3480	94f429f1-4cad-4c73-8112-d463972a53c8	10:00 AM	02:00 PM	f	\N	app	\N	755	250
3481	f52e234d-225e-45f0-874b-0826789e11db	02:00 PM	06:00 PM	f	\N	app	\N	755	250
3482	b10bf8d4-f577-462b-a1bc-fc05cd9d8672	06:00 PM	10:00 PM	f	\N	app	\N	755	200
3483	c3f2c6c8-1137-4d02-8937-b51a2f634589	10:00 PM	05:00 AM	f	\N	app	\N	755	200
3484	9264cd5b-520c-4ff8-ba11-ffb2379ec600	06:00 AM	10:00 AM	f	\N	app	\N	756	200
3485	d112f7fa-10b1-4d55-b256-976d1d634cdf	10:00 AM	02:00 PM	f	\N	app	\N	756	250
3486	66e3e761-b595-4c12-811d-30025574be38	02:00 PM	06:00 PM	f	\N	app	\N	756	250
3487	a056654f-1ebb-4260-a31f-331f275d3f84	06:00 PM	10:00 PM	f	\N	app	\N	756	200
3488	f697585b-6dee-4796-9555-3adcbc5e1663	10:00 PM	05:00 AM	f	\N	app	\N	756	200
3489	59002d13-8b2a-48a5-a5e6-7ddfd39c72f9	06:00 AM	10:00 AM	f	\N	app	\N	757	200
3490	6dc9e07c-9c1f-4f34-945b-f0def894ab9b	10:00 AM	02:00 PM	f	\N	app	\N	757	250
3491	5d59c1f2-db33-4f36-97b8-284a26352c80	02:00 PM	06:00 PM	f	\N	app	\N	757	250
3492	8480fdf8-f211-4cf0-8c94-6addb5791f54	06:00 PM	10:00 PM	f	\N	app	\N	757	200
3493	b409c64c-7d23-48fb-ad0f-b8a0e4b0b708	10:00 PM	05:00 AM	f	\N	app	\N	757	200
3494	c605a317-f1b8-440b-8e70-a830db6e51c6	06:00 AM	10:00 AM	f	\N	app	\N	758	200
3495	a9765f9a-d519-460d-a3f8-d41542a918c1	10:00 AM	02:00 PM	f	\N	app	\N	758	250
3496	1f56d178-84cc-4e59-a9a2-cea3aeb6a21f	02:00 PM	06:00 PM	f	\N	app	\N	758	250
3497	516894f9-457d-4750-96f6-5f6eefb6055d	06:00 PM	10:00 PM	f	\N	app	\N	758	200
3498	4e071d2a-fd78-4981-b005-0a3714e9cc8c	10:00 PM	05:00 AM	f	\N	app	\N	758	200
3499	f3b4f58f-1af7-4d81-a3ba-a154828886fd	06:00 AM	10:00 AM	f	\N	app	\N	759	200
3500	6484a666-291d-4f21-b013-edf95cc9c271	10:00 AM	02:00 PM	f	\N	app	\N	759	250
3501	dda904ab-cc11-46de-a2a0-82f9fc2ecf49	02:00 PM	06:00 PM	f	\N	app	\N	759	250
3502	3349fa5f-ce47-4f7b-ba23-ce954104069c	06:00 PM	10:00 PM	f	\N	app	\N	759	200
3503	257741b8-d186-48dd-ad26-9a9ec70d3aa9	10:00 PM	05:00 AM	f	\N	app	\N	759	200
3504	392ad7c7-eee5-4e96-94dd-508192546233	06:00 AM	10:00 AM	f	\N	app	\N	760	200
3505	afc0357a-b429-4e33-89a8-77cdb7900f3b	10:00 AM	02:00 PM	f	\N	app	\N	760	250
3506	ed256910-355a-4114-bfa2-5e9431ed4f81	02:00 PM	06:00 PM	f	\N	app	\N	760	250
3507	a0bb2051-2dd9-4f90-9f89-3b23d72e80da	06:00 PM	10:00 PM	f	\N	app	\N	760	200
3508	4022aeb3-7e96-48f4-b724-ca693fada41d	10:00 PM	05:00 AM	f	\N	app	\N	760	200
3509	a0a81013-b068-4db8-a0a7-e3179ebd03b2	06:00 AM	10:00 AM	f	\N	app	\N	761	200
3510	5b584b1d-1a7c-4b31-90fd-80f5e0503fe5	10:00 AM	02:00 PM	f	\N	app	\N	761	250
3511	b5aac258-36d6-4b44-a970-42d631616f1b	02:00 PM	06:00 PM	f	\N	app	\N	761	250
3512	65376367-f4f4-4f28-a988-f23e84104e12	06:00 PM	10:00 PM	f	\N	app	\N	761	200
3513	6cdd6e92-68ad-438b-8125-37330603d9c4	10:00 PM	05:00 AM	f	\N	app	\N	761	200
3514	b351817f-75ae-417b-92dc-ad9b739e92d1	06:00 AM	10:00 AM	f	\N	app	\N	762	200
3515	6099fccb-9193-403a-88af-fa8155b6e529	10:00 AM	02:00 PM	f	\N	app	\N	762	250
3516	7e100673-1cc1-431b-a921-50d8a54c9830	02:00 PM	06:00 PM	f	\N	app	\N	762	250
3517	ed72ac9b-6d22-4fca-8bc6-ad1c54457660	06:00 PM	10:00 PM	f	\N	app	\N	762	200
3518	812dba26-27cb-485b-95e5-6cf7baab4826	10:00 PM	05:00 AM	f	\N	app	\N	762	200
3519	643a3ddd-0ae9-4455-9333-47ef0e4d27f9	06:00 AM	10:00 AM	f	\N	app	\N	763	200
3520	62523c23-1233-405d-850c-e69e996a6441	10:00 AM	02:00 PM	f	\N	app	\N	763	250
3521	02621a6d-84a4-479c-b43c-8cee328d80e6	02:00 PM	06:00 PM	f	\N	app	\N	763	250
3522	e2c590b3-c6eb-48a9-b330-b9bc5fdc3112	06:00 PM	10:00 PM	f	\N	app	\N	763	200
3523	8d641463-123f-4680-b526-c799c908d430	10:00 PM	05:00 AM	f	\N	app	\N	763	200
3524	25a7eddb-ff4a-4b5f-a5e3-e47242ad6828	06:00 AM	10:00 AM	f	\N	app	\N	764	200
3525	5a56c78f-99b4-45ad-82fc-21dc1e42a2e3	10:00 AM	02:00 PM	f	\N	app	\N	764	250
3526	bfac9dfd-4f02-4f68-a01a-183dcf4cae10	02:00 PM	06:00 PM	f	\N	app	\N	764	250
3527	4fe84d17-f996-4416-b5a6-3ec12e82ec90	06:00 PM	10:00 PM	f	\N	app	\N	764	200
3528	ca581811-c5bd-4c50-81d3-562e5de074cd	10:00 PM	05:00 AM	f	\N	app	\N	764	200
3529	ee8d4525-54c7-4e40-b597-e6bf4244916a	06:00 AM	10:00 AM	f	\N	app	\N	765	200
3530	b76123ae-be0f-406c-a997-cfdf10ef3a8d	10:00 AM	02:00 PM	f	\N	app	\N	765	250
3531	d04cd687-3d6c-4c31-9f28-2b27060735ed	02:00 PM	06:00 PM	f	\N	app	\N	765	250
3532	88ddddd2-566d-4765-be97-ddb85f1c4e32	06:00 PM	10:00 PM	f	\N	app	\N	765	200
3533	4a76ccc0-00f0-45cf-a70c-92c26e2ee3b8	10:00 PM	05:00 AM	f	\N	app	\N	765	200
3534	8a1e48ba-b083-49b2-92a5-74d9787ceb25	06:00 AM	10:00 AM	f	\N	app	\N	766	200
3535	26a6f352-eb8a-4136-99b8-39c136e2f531	10:00 AM	02:00 PM	f	\N	app	\N	766	250
3536	913ace00-6a85-4668-ad62-d98b1dfbf29a	02:00 PM	06:00 PM	f	\N	app	\N	766	250
3537	34e29150-f8d3-4733-a850-a9ef7f410c1e	06:00 PM	10:00 PM	f	\N	app	\N	766	200
3538	241a34b4-6ffe-463c-92f6-e4197308cbe4	10:00 PM	05:00 AM	f	\N	app	\N	766	200
3539	d9acdb3e-15bc-474a-bac7-df403ddb2956	06:00 AM	10:00 AM	f	\N	app	\N	767	200
3540	0fa826ad-375c-47f1-b780-b1553033733e	10:00 AM	02:00 PM	f	\N	app	\N	767	250
3541	7428dd3f-50c9-459c-9946-8ee6f7e73ef3	02:00 PM	06:00 PM	f	\N	app	\N	767	250
3542	6687f748-ac6d-43b5-aae5-6e25d6fb5b57	06:00 PM	10:00 PM	f	\N	app	\N	767	200
3543	52117f02-9b47-43c5-bd95-e239083cf226	10:00 PM	05:00 AM	f	\N	app	\N	767	200
3544	de1453dc-d48f-4b6f-b040-4ebdad44414c	06:00 AM	10:00 AM	f	\N	app	\N	768	200
3545	f405de07-8c61-4b89-b8dc-bcbd78b87562	10:00 AM	02:00 PM	f	\N	app	\N	768	250
3546	df01f712-3b1e-43e3-b2fd-2b380d2079be	02:00 PM	06:00 PM	f	\N	app	\N	768	250
3547	40e1c3ba-1509-4a23-b726-b656215bce3b	06:00 PM	10:00 PM	f	\N	app	\N	768	200
3548	d5d47a3c-bbdf-4295-a3a0-147018157c03	10:00 PM	05:00 AM	f	\N	app	\N	768	200
3549	575083f5-8ca7-40b2-a24f-17fc0daa5e36	06:00 AM	10:00 AM	f	\N	app	\N	769	200
3550	93f9a8a3-beed-43d8-bf51-e4280ae54441	10:00 AM	02:00 PM	f	\N	app	\N	769	250
3551	dc072279-4022-4135-bf27-cb8548866ac2	02:00 PM	06:00 PM	f	\N	app	\N	769	250
3552	13f1c9e7-f392-42fd-82c3-02fdc56b1e51	06:00 PM	10:00 PM	f	\N	app	\N	769	200
3553	c62efe8e-6407-40b1-9ada-9919b47683ad	10:00 PM	05:00 AM	f	\N	app	\N	769	200
3554	38f54b63-f190-4eef-8acb-efd78a2a1ccd	06:00 AM	10:00 AM	f	\N	app	\N	770	200
3555	476553d2-985d-422e-9cdc-933b387d22d4	10:00 AM	02:00 PM	f	\N	app	\N	770	250
3556	e69da544-b832-4208-92e1-9d04655a4238	02:00 PM	06:00 PM	f	\N	app	\N	770	250
3557	cae9909a-e608-47a9-83dc-08179f1e8422	06:00 PM	10:00 PM	f	\N	app	\N	770	200
3558	1bf278d4-18a7-4867-834f-69d34624c53c	10:00 PM	05:00 AM	f	\N	app	\N	770	200
3559	564e768b-3799-4a3d-939b-475169d614cf	12:00 AM	11:59 PM	t	\N	app	\N	772	1
2221	d56f66e7-6067-42ef-a419-f549e44445fe	02:00 PM	06:00 PM	t	9	app	2025-03-02 11:35:17.206	515	350
2422	aa66f7f2-06ad-4450-8dc4-72c7856c01da	10:00 AM	02:00 PM	t	41	app	2025-03-02 12:59:52.676	557	350
2411	af301b9d-c747-4884-a0ea-e0ea51774812	06:00 AM	10:00 AM	t	38	app	2025-03-02 14:04:09.663	555	200
2309	4231c0d7-31dc-4d3d-bf01-4d1ebf949cea	06:00 AM	10:00 AM	t	43	app	2025-03-02 16:06:42.676	533	200
2433	93a24fdc-3844-406b-b1b9-c6a51d7d7510	02:00 PM	06:00 PM	t	3	admin	2025-04-02 00:00:00	559	350
2429	775b926b-21e5-40a4-b369-daae30430a9d	06:00 PM	10:00 PM\n	f	\N	app	\N	558	200
2359	c4e993a3-74c9-4f30-a9e8-387d991b527a	06:00 PM	10:00 PM\n	f	\N	app	\N	544	200
2364	cfe136c5-aeba-4143-aa06-94469680f672	06:00 PM	10:00 PM	t	3	admin	2025-03-01 00:00:00	545	200
2369	ca2eb999-74fc-4414-bd61-a6f98c5ce146	06:00 PM	10:00 PM	f	\N	app	\N	546	200
2374	15d52143-0a13-42f0-9a12-555aadd85f0c	06:00 PM	10:00 PM	f	\N	app	\N	547	200
2379	3a317b94-86f6-41c9-b6cb-0f111a4c8c6b	06:00 PM	10:00 PM	f	\N	app	\N	548	200
2384	e186a0fa-1469-4cdd-8ddb-d7362340b838	06:00 PM	10:00 PM	f	\N	app	\N	549	200
2389	611bc90e-bf3b-492a-b858-1c646d565e21	06:00 PM	10:00 PM	f	\N	app	\N	550	200
2394	e68cdabb-c999-40e8-a1bf-a5d4c7775f06	06:00 PM	10:00 PM	f	\N	app	\N	551	200
2399	c8fe2bea-a10b-4712-9125-43c2e2b9443b	06:00 PM	10:00 PM	f	\N	app	\N	552	200
2404	29c2dd18-32d3-4f76-b3aa-64bdff0d3898	06:00 PM	10:00 PM	f	\N	app	\N	553	200
2409	548085de-cf53-4566-aee2-147105ce4ac7	06:00 PM	10:00 PM	t	3	admin	2025-03-01 00:00:00	554	200
2414	b35f4d6f-3ab0-4339-b1b0-04601c14ad88	06:00 PM	10:00 PM	f	\N	app	\N	555	200
2419	9484c164-3973-452b-9b6d-055b428b0e23	06:00 PM	10:00 PM	f	\N	app	\N	556	200
2424	21dcb879-0502-43b0-9e5e-5bb9f3e2bcbc	06:00 PM	10:00 PM	f	\N	app	\N	557	200
2434	0c5c1586-0621-4d4a-adb4-584fed8851e7	06:00 PM	10:00 PM	f	\N	app	\N	559	200
2439	54f0baa7-b0cc-48ee-802a-8787cc929bf4	06:00 PM	10:00 PM	f	\N	app	\N	560	200
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transaction" (id, "transactionId", amount, type, description, "createdAt", "userId", "adminId", "libraryId", "bookingId", "expiresAt", "isOfflinePayment", "offlinePaymentStatus") FROM stdin;
381	6c4e4a63-b294-4d30-8c47-3fc01ee6075b	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 06:46:32.828	7	\N	2	\N	\N	f	\N
382	e3f3fba8-1c56-4d09-a038-b3ef53e647e6	200	BOOKING_PAYMENT	Payment for booking	2025-03-01 06:46:32.832	7	\N	2	310	\N	f	\N
383	adddfe6a-9e19-4875-851e-af366c99b230	700	BOOKING_PAYMENT	Payment for booking	2025-03-01 07:25:03.454	7	\N	2	311	\N	f	\N
384	417e4153-f169-4d8e-a831-158ec04bcab6	200	BOOKING_PAYMENT	Payment for booking	2025-03-01 07:28:12.859	7	\N	2	312	\N	f	\N
385	59ad2675-d66c-45e1-8401-8b17e048f56a	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 07:47:38.022	7	\N	2	313	\N	f	\N
386	8aa2a3d5-d470-4f95-a79f-9aaad0fe624f	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 08:22:30.696	35	\N	2	\N	\N	f	\N
387	fa7b1c58-a118-4ee6-9243-f1717d418d1c	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 08:22:30.699	35	\N	2	314	\N	f	\N
388	8fccab44-610d-484a-bfb9-80b8a705e787	700	BOOKING_PAYMENT	Payment for booking	2025-03-01 08:26:27.669	7	\N	2	315	\N	f	\N
389	9c46225b-666d-4871-9e1e-d1748e8aad8a	700	BOOKING_PAYMENT	Payment for booking	2025-03-01 09:17:49.046	7	\N	2	316	\N	f	\N
390	2f2c6ceb-2061-4be9-91bf-fe35549d46bb	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 09:19:29.686	9	\N	5	\N	\N	f	\N
391	facf3d1d-1633-484b-942c-e8dcf032db42	300	BOOKING_PAYMENT	Payment for booking	2025-03-01 09:19:29.689	9	\N	5	317	\N	f	\N
392	d02a8c77-ade3-4b6c-8788-00b9e19de78d	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 09:19:54.595	9	\N	2	\N	\N	f	\N
393	b96c6951-4020-42ba-8e5f-8e052395e757	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 09:19:54.598	9	\N	2	318	\N	f	\N
394	8c1e0bd2-db0e-491c-9998-03d31b5fee6a	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 09:45:03.246	9	\N	2	319	\N	f	\N
395	06e8466f-0ab7-47c0-a4ac-1b90756c567b	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 09:45:11.445	9	\N	2	320	\N	f	\N
396	f0558092-a19b-4087-b376-ef1b299391e2	500	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 10:05:10.422	9	\N	13	\N	\N	f	\N
397	5e3f2a51-bcba-4b95-9619-c86bf0bf6622	200	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:05:10.426	9	\N	13	321	\N	f	\N
398	dcebb993-8a4b-4845-a738-84da758084a2	200	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:15:49.905	9	\N	13	322	\N	f	\N
399	fc172c29-e42d-4b29-b83b-278ea62d4709	200	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:24:45.989	9	\N	13	323	\N	f	\N
401	ffc9740f-ff26-45d1-a7de-d112b6607246	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:25:11.698	9	\N	2	324	\N	f	\N
402	d84e68e4-e52a-4162-a77b-cec0b79f543a	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:25:49.045	9	\N	2	325	\N	f	\N
403	aa5f35cb-4362-4aec-9867-a8fe0cebc743	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 10:26:14.998	9	\N	14	\N	\N	f	\N
404	e8859381-6dc7-4568-922b-659650db4877	300	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:26:15.001	9	\N	14	326	\N	f	\N
405	13a5b0a4-a085-4ef9-962c-34e7dff8c905	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:26:27.645	9	\N	2	327	\N	f	\N
406	24448349-f9cb-4428-827e-b07f564aecfa	700	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:27:07.233	9	\N	14	328	\N	f	\N
407	159f4364-a002-493d-9e74-2bf6c2d0e2d8	700	BOOKING_PAYMENT	Payment for booking	2025-03-01 10:27:37.913	9	\N	14	329	\N	f	\N
400	6e6fad2b-a809-4e38-a213-e420b7563846	700	OFFLINE_BOOKING	Offline payment request for booking 323 at library 13 by user undefined at 2025-03-01T10:24:49.697Z	2025-03-01 10:24:49.698	\N	\N	13	323	2025-03-01 10:27:59.697	t	CANCELED
428	f29d0803-1388-4535-98b5-b0be26119bc6	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-02 09:53:46.761	41	\N	2	\N	\N	f	\N
409	cd702afc-5255-4d03-a11d-a927c2372713	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 11:28:03.426	7	\N	2	331	\N	f	\N
410	45bfa9ab-918b-42ff-a992-e9e9b23126f8	350	BOOKING_PAYMENT	Payment for booking	2025-03-01 11:47:54.229	7	\N	2	332	\N	f	\N
411	0405c32a-cb8c-4af6-b2ab-32ff074fa119	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 11:57:18.37	7	\N	14	\N	\N	f	\N
412	df9ecb1d-d928-4208-8dc6-a79cb73b004a	300	BOOKING_PAYMENT	Payment for booking	2025-03-01 11:57:18.373	7	\N	14	333	\N	f	\N
413	cca8e521-a391-4796-88de-2461f280328c	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-01 12:49:07.071	38	\N	2	\N	\N	f	\N
415	91fea48c-b627-4998-903a-609384b4dc6b	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-02 08:02:06.327	40	\N	2	\N	\N	f	\N
417	94456ef5-9dbc-42ef-a05a-1070a158182a	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-02 08:23:20.794	3	\N	2	\N	\N	f	\N
418	86aa5941-7b38-406d-9f9c-bdbbbca8a152	200	BOOKING_PAYMENT	Payment for booking	2025-03-02 08:23:20.798	3	\N	2	336	\N	f	\N
419	a18dd4f9-de7f-4ec6-8e47-8d69eeeb3c1f	200	BOOKING_PAYMENT	Payment for booking	2025-03-02 08:24:26.398	3	\N	2	337	\N	f	\N
421	38b8f528-84df-47db-ae2d-a7a380e69b2a	350	BOOKING_PAYMENT	Payment for booking	2025-03-02 08:32:41.993	7	\N	2	339	\N	f	\N
422	5a97e16b-6867-4d86-acde-b9e519ec118f	700	BOOKING_PAYMENT	Payment for booking	2025-03-02 08:33:38.289	7	\N	14	340	\N	f	\N
423	40acb200-3031-4281-a0f0-0db69b4e7057	700	BOOKING_PAYMENT	Payment for booking	2025-03-02 09:26:41.14	7	\N	14	341	\N	f	\N
424	18045531-adba-4bc2-a063-e200b2531895	700	BOOKING_PAYMENT	Payment for booking	2025-03-02 09:26:57.955	7	\N	14	342	\N	f	\N
425	43426805-1d21-4f94-a614-9bb0a74bedeb	300	BOOKING_PAYMENT	Payment for booking	2025-03-02 09:28:37.642	7	\N	14	343	\N	f	\N
426	cc618088-cd86-4940-926d-4217273aca7d	200	BOOKING_PAYMENT	Payment for booking	2025-03-02 09:32:06.114	7	\N	2	344	\N	f	\N
414	f5e9db5a-8bed-4737-ac90-d43097841b53	550	BOOKING_PAYMENT	Payment for booking	2025-03-01 12:49:07.075	38	\N	2	\N	\N	f	\N
429	a858017d-29d4-4ce6-b47c-be23f838f675	700	BOOKING_PAYMENT	Payment for booking	2025-03-02 09:53:46.764	41	\N	2	346	\N	f	\N
432	1bf50c24-fdf0-46d6-a03c-8e6b58ee8ee2	550	BOOKING_PAYMENT	Payment for booking	2025-03-02 10:59:56.416	38	\N	2	349	\N	f	\N
434	18ec8130-0d54-4e68-9620-86fe588f6ac1	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-02 11:10:15.69	42	\N	2	\N	\N	f	\N
435	d21c4315-c555-416d-923d-155efe6780b0	350	BOOKING_PAYMENT	Payment for booking	2025-03-02 11:10:15.694	42	\N	2	351	\N	f	\N
436	841a40d1-dfb1-47a0-a1ed-efeccac6e22a	350	BOOKING_PAYMENT	Offline payment request for booking 352 at library 2 by user 42 at 2025-03-02T11:38:17.863Z	2025-03-02 11:38:07.628	42	\N	2	352	2025-03-02 11:41:27.863	t	CANCELED
437	ee1331ca-671e-48d9-bf20-62fb2e9db541	350	BOOKING_PAYMENT	Payment for booking	2025-03-02 12:34:32.327	7	\N	2	353	\N	f	\N
438	71a0510d-034e-4412-826e-e79c716796b6	200	BOOKING_PAYMENT	Payment for booking	2025-03-02 12:43:42.05	3	\N	2	354	\N	f	\N
439	2f8ffda7-d54e-461f-af29-73d7a63af262	900	BOOKING_PAYMENT	Payment for booking	2025-03-02 12:52:47.887	3	\N	2	355	\N	f	\N
440	a9b1877f-1f7e-4877-9a6b-b9d162c94188	500	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-02 12:52:54.306	43	\N	4	\N	\N	f	\N
441	ce593490-0793-4a0f-8bf1-d1abe3452283	600	BOOKING_PAYMENT	Payment for booking	2025-03-02 12:52:54.308	43	\N	4	356	\N	f	\N
442	169befd5-dd0a-437e-b8f6-15ddab82c754	300	BOOKING_PAYMENT	Payment for booking	2025-03-02 12:53:46.766	43	\N	4	357	\N	f	\N
443	1459001a-fb96-4500-a6b9-47bcacc012ac	0	REGISTRATION_FEE	Registration fee for first-time booking	2025-03-02 13:04:20.063	43	\N	2	\N	\N	f	\N
444	9e755e8f-2453-42e2-813e-416704a6d5ff	200	BOOKING_PAYMENT	Offline payment approved by admin	2025-03-02 13:04:20.067	43	\N	2	358	2025-03-02 13:09:10.366	t	APPROVED
445	df81b80c-ef0e-44df-892e-d6c065934b91	200	BOOKING_PAYMENT	Offline payment approved by admin	2025-03-02 13:08:51.35	3	\N	2	359	2025-03-02 13:12:06.348	t	APPROVED
446	e38b9904-7a89-448b-bead-4b6d41d04ffe	200	BOOKING_PAYMENT	Payment for booking	2025-03-02 14:05:56.697	3	\N	2	360	\N	f	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, password, "accountType", "additionalDetails", image, "resetPasswordExpires", "phoneNumber") FROM stdin;
1	Ashwi	Ashwin	$2b$10$9DKlD8UpxyKpt/QLp.cUCOCkbc9HOqcbPCWWEmXiXUaFzn6NAjgdm	User	\N	https://avatars.dicebear.com/api/initials/Ashwi.svg	\N	9416482163
3	Amit	amitnirala14@gmail.com	$2b$10$zRULucbL51SkQR92hc0qn.V.8Kjg8DTqKdoDgXWHxgot.W2W/E7vO	User	\N	https://avatars.dicebear.com/api/initials/Amit.svg	\N	9471803877
4	Deepak Kumar	deepakmaurya8396@gmail.com	$2b$10$dPgGC2Tqng2r5xYDBTiy2eyRfo5KHQJSZGfHkTwVKICkcCgz4yDGe	User	\N	https://avatars.dicebear.com/api/initials/Deepak Kumar.svg	\N	9919168088
6	Harsh kumar saw	mister.harshkumar@gmail.com	$2b$10$0.3AUYe.WJ0klduD8CoS.esqMl7TIXQ/LnhQt1mkpgqprZhdgor1m	User	\N	https://avatars.dicebear.com/api/initials/Harsh kumar saw.svg	\N	7991168445
33	Vikas Kumar	vikaskumar785695@gmail.com	$2b$10$2slV9y6SRLdPSL5DINQtaulrru4D8j4gD9wVY69c0s1EOHwFLYFlq	User	\N	https://eu.ui-avatars.com/api/?name=Vi&size=250	\N	9229879270
8	Kumar Neeraj	yadavkumar26022003@gmail.com	$2b$10$n44SVq7IIkgqS4g.whiv5uMxBdhNuR439d20I5.PMUGtSrhXC.vY6	User	\N	https://avatars.dicebear.com/api/initials/Harsh kumar saw.svg	\N	9234345896
9	Ashu	ashwin@jythu.com	$2b$10$HADDVgs/3SxZKWx.UAcWlOC0kmwF20sz44F6EUvtUcjCXufta0MgS	User	\N	https://eu.ui-avatars.com/api/?name=As&size=250	\N	9992304660
10	Kritika	Kritikabharti01@gmail.com	$2b$10$ARfhew6MOR5rbuKFVMpcq..hcQoBHBeisxXBq1A99cskrPKPlFJu.	User	\N	https://eu.ui-avatars.com/api/?name=Kr&size=250	\N	9827595804
11	Tanu	yadavhema444@gmail.com	$2b$10$MJJyevI7/rGftjiTj03ZkuF1j.04LeiOVvg6RVJz0FSVYJJi9REvK	User	\N	https://eu.ui-avatars.com/api/?name=Ta&size=250	\N	8757269670
12	Priyanka	priyankaprajapati1996gts@gmail.com	$2b$10$Yyii8WkC5YHYMNh7wk0.MeTwM1PkFwpCeYbmf0HqhovjW/dYJ0TbS	User	\N	https://eu.ui-avatars.com/api/?name=Pr&size=250	\N	7258862407
13	Ankit Yadav	ankit.email20@gmail.com	$2b$10$tSggnm3tyHGlovWVNQZO2.H/v4CU5RcUOhNs9wajwTgafhJ/PGeIy	User	\N	https://eu.ui-avatars.com/api/?name=An&size=250	\N	6390336963
7	Subodh	subodhe987@gmail.com	$2b$10$nzTJBC21Lwtj0zKptrnY4uZiQypTu35VupqS6W.hjibuQvCt4Wycy	User	\N	https://avatars.dicebear.com/api/initials/Harsh kumar saw.svg	\N	7976648675
14	Dharmender Kumar Meena	dharmender101296@gmail.com	$2b$10$JOQkpdqYPE7pus6hRBJ.WOxxvOKNM63HrCjwURj1hotUteTkX3wsy	User	\N	https://eu.ui-avatars.com/api/?name=Dh&size=250	\N	8619999299
15	Saurav Kumar	mansaurav58@gmail.com	$2b$10$tc7MLBeZpJWxyNNQ55hfMObLphJMt7MJSYvZTP6JA0IlJSnHsZqqS	User	\N	https://eu.ui-avatars.com/api/?name=Sa&size=250	\N	6291188751
16	Prem prakash	premprakash1462@gmail.com	$2b$10$BHHlHKBYMIdBDr4AZKlS8eM83tRki.6a/p4lA0JLrs51Pa4jxnop6	User	\N	https://eu.ui-avatars.com/api/?name=Pr&size=250	\N	8002889475
17	Nishant Kumar 	nishant9508105267@gmail.com	$2b$10$39WAHm84bCIAyx2sSJd1VOLB//kU/hjhKCKIV6PPja/uYRFswUx9y	User	\N	https://eu.ui-avatars.com/api/?name=Ni&size=250	\N	7322892415
18	Suresh kumar	advsureshkumar1294@gmail.com	$2b$10$sntT3rrysBq.nVE8bfgwCezPcJSSoksj9I1g3OUJa95nOgxwZqIsG	User	\N	https://eu.ui-avatars.com/api/?name=Su&size=250	\N	9006465148
19	Keshav kumar 	Keshavkumargaya208@gmail.com	$2b$10$tRGpTPIJm3bSN50wxPOuE.TGEJI/wATKvCxTDtqzpmsqyncx37i4.	User	\N	https://eu.ui-avatars.com/api/?name=Ke&size=250	\N	9508715459
20	Rounak Raj	rounakworkform@gmail.com	$2b$10$4VBNucd78nThc5vqhBlnUeLpprxQBij6sa.iS50weyV74hg8H/JnC	User	\N	https://eu.ui-avatars.com/api/?name=Ro&size=250	\N	9241804241
21	Abhishek Kumar 	ak864590@gmail.com	$2b$10$8rB3XCbGJ9a5lhNOVVCqVOL6bRfCEpImlWZ2nkboIjTrV3XZ1L7iS	User	\N	https://eu.ui-avatars.com/api/?name=Ab&size=250	\N	7256067394
22	Ekagra	ekagrainfo@gmail.com	$2b$10$vueUYpuWtM42J32Bh7/DyuCjPmllTnxUhNCIvgrgJF5EIhUj8xqwa	User	\N	https://eu.ui-avatars.com/api/?name=Ek&size=250	\N	9109539428
23	Mukesh Yaduvanshi	mukeshkumar30122001@gmail.com	$2b$10$eO4I3OukyPP.DBR4EFK94uayMP1UWXD6rVbDCIFCFXtpRg0Q1Ys6e	User	\N	https://eu.ui-avatars.com/api/?name=Mu&size=250	\N	7277729919
24	Vikash Kumar	vikashkumarpatel9113@gmail.com	$2b$10$JZbdx/f5IHU1mje.THGsmOncYqJLJcnX2/o5zOWSy0BzG4ewLwXLK	User	\N	https://eu.ui-avatars.com/api/?name=Vi&size=250	\N	9113171729
25	Monit Kumar	adarsh31975@gmail.com	$2b$10$g2V3XqfGMzuVujOrQLvsTOXb2kS7UBliL6p51Kzy6C5Tgl7oxCkB6	User	\N	https://eu.ui-avatars.com/api/?name=Mo&size=250	\N	7972169787
26	Aditya Singh 	Adityarajyy77@gmail.com	$2b$10$OinkQGCReyWzKYngiYoEc.CcX7wBKzIlN9SE7PAOni8yM5NvYknj.	User	\N	https://eu.ui-avatars.com/api/?name=Ad&size=250	\N	8409131031
27	Ankit Kumar	ak1742854@gmail.com	$2b$10$5tOqtl0PaKDIeK0f5AYs3.UugzDeHeIeqLzHkpRzqr9BWaQ588f.S	User	\N	https://eu.ui-avatars.com/api/?name=An&size=250	\N	9155930208
28	Jay Prakash	jpk6205751@gmail.com	$2b$10$.1RCmBfw6znHPWKZReMh2echzDmCLHDCaT37kDE565gqheockInuq	User	\N	https://eu.ui-avatars.com/api/?name=Ja&size=250	\N	6205751680
29	Vishwaranjan Bhardwaj	vb05092001@gmail.com	$2b$10$l3jIUXk/VqNJG7OtyTliqe/E289TA9X.oOTS3F65MKUY13NfDbZTu	User	\N	https://eu.ui-avatars.com/api/?name=Vi&size=250	\N	8742019853
30	Alok yadav 	royalyadavsarkar94@gmail.com	$2b$10$gguz15hJtQhlUrPuha3RQePqeVLZlEbJdU2ErFuqoAyvs1a0J/TjK	User	\N	https://eu.ui-avatars.com/api/?name=Al&size=250	\N	6209218278
31	Ambika	ambikaranjanjha007@gmail.com	$2b$10$Vg1rGbXsPfER2l0iJlvmT.8rGBXJ1Dz0BEARbIITT6GLuWCckRbT6	User	\N	https://eu.ui-avatars.com/api/?name=Am&size=250	\N	7008325547
32	Tejveer 	Tejveer.events@gmail.com	$2b$10$EGOqKnd8Fbw9Il436erJNeGOYKGW83dgnFlXvmBn6LmanlGuUy5ou	User	\N	https://eu.ui-avatars.com/api/?name=Te&size=250	\N	9351670646
34	Sonu Kumar	sonuwrs891@gmail.com	$2b$10$perGwgq1oY4nKEVOj2XEzOXrn37/xWOwnY1.81B9iqRK56Yg.p0V2	User	\N	https://eu.ui-avatars.com/api/?name=So&size=250	\N	9525638307
35	Utsav Raj	utsavraj992@gmail.com	$2b$10$AQD7xixFPYSl7zVb9Vf2heyZkI5EsXRJPB8mtsbKqlyxSANpfPWzW	User	\N	https://eu.ui-avatars.com/api/?name=Ut&size=250	\N	7763967871
36	Rahul kumar	rahubabu6052@gmail.com	$2b$10$dyOWPnliR4mWGITtzuTyYuxoyQ037gzp6P1/IZn6kAnDVi2Mj42yO	User	\N	https://eu.ui-avatars.com/api/?name=Ra&size=250	\N	9097446052
37	Rahul Kumar	rahulkumarmojj@gmail.com	$2b$10$tb18uZxufdaswFYvYw1UWu4IihZeOrhPuO8DLn6e1jHm3XKHcSZda	User	\N	https://eu.ui-avatars.com/api/?name=Ra&size=250	\N	8873509801
38	SNEHA PRIYA	priyasneha08092001@gmail.com	$2b$10$MCIOxDssyAGeqK93ELj8geyp7K8zA/MBSxwRBNGQV/T0ORK.CaHty	User	\N	https://eu.ui-avatars.com/api/?name=SN&size=250	\N	7762014016
39	Shammi Kumar	shammiks49@gmail.com	$2b$10$xporXHY7ju6hrcr87WqGWuZdfKnCk8oT/E6Bhvw.mWBPndAV4Z.iC	User	\N	https://eu.ui-avatars.com/api/?name=Sh&size=250	\N	8789356622
40	Rohit Kumar	rohitkumar6287212089@gmail.com	$2b$10$6.yqHwqIjU2Yfapii6gL8e7ZI6NcS426wMAQKhe1cRdjBgY92bWjq	User	\N	https://eu.ui-avatars.com/api/?name=Ro&size=250	\N	6287212089
41	Prince Raj	princeraj9826@gmail.com	$2b$10$TkruSb3oS./Xv0YZ8/2/xOhlt51eEauORWfXsseJVGLF03oWlFjlu	User	\N	https://eu.ui-avatars.com/api/?name=Pr&size=250	\N	7979767927
42	Ravi Kumar	ravikum8202@gmail.com	$2b$10$PBUYZ2zaIRfJnNEnjF7Qw..CjJv1Njt/Q5OcpGHWKHMDNTJWhd7oC	User	\N	https://eu.ui-avatars.com/api/?name=Ra&size=250	\N	8603003613
43	Rohit Kumar	krrohit62056@gmail.com	$2b$10$z2X/t88xM5Jghl7TyUQVBe6nn3MdrXQp9MRM2U0mzzStvO87QLjky	User	\N	https://eu.ui-avatars.com/api/?name=Ro&size=250	\N	6205674728
\.


--
-- Data for Name: _LibraryBookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_LibraryBookings" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _OwnedProperties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_OwnedProperties" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3538c1be-d51a-402c-8e21-da979550d9a6	29d17860aa79b20b7c7e7808b0fc6331a009fe6bd1cec8164f9c1137ab2b9045	2025-02-27 10:17:14.863819+00	20250227093318_init_backup		\N	2025-02-27 10:17:14.863819+00	0
730ea69c-472e-43d2-9f53-44fd2e8d524f	818339e0992f7e65fe7860d22d907138fa6931d564b26fe66b715f54a7b57c5b	2025-02-27 10:32:39.694373+00	20250227103152_add_offline_booking_permission	\N	\N	2025-02-27 10:32:39.691376+00	1
\.


--
-- Name: AdhaarCardDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AdhaarCardDetails_id_seq"', 109, true);


--
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 111, true);


--
-- Name: Amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Amenities_id_seq"', 25, true);


--
-- Name: App_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."App_id_seq"', 6, true);


--
-- Name: BookingFriend_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BookingFriend_id_seq"', 1, false);


--
-- Name: Booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Booking_id_seq"', 360, true);


--
-- Name: Distance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Distance_id_seq"', 375, true);


--
-- Name: Friend_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Friend_id_seq"', 1, false);


--
-- Name: Invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Invoice_id_seq"', 7, true);


--
-- Name: Library_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Library_id_seq"', 25, true);


--
-- Name: Location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Location_id_seq"', 29, true);


--
-- Name: Otp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Otp_id_seq"', 194, true);


--
-- Name: PanCardDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PanCardDetails_id_seq"', 109, true);


--
-- Name: PhoneOtp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PhoneOtp_id_seq"', 482, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 4, true);


--
-- Name: Room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Room_id_seq"', 36, true);


--
-- Name: Seat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Seat_id_seq"', 772, true);


--
-- Name: TimeSlot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TimeSlot_id_seq"', 3559, true);


--
-- Name: Transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transaction_id_seq"', 446, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 43, true);


--
-- Name: location_appid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_appid_seq', 1, false);


--
-- Name: AdhaarCardDetails AdhaarCardDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AdhaarCardDetails"
    ADD CONSTRAINT "AdhaarCardDetails_pkey" PRIMARY KEY (id);


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: Amenities Amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenities"
    ADD CONSTRAINT "Amenities_pkey" PRIMARY KEY (id);


--
-- Name: App App_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."App"
    ADD CONSTRAINT "App_pkey" PRIMARY KEY (id);


--
-- Name: BookingFriend BookingFriend_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookingFriend"
    ADD CONSTRAINT "BookingFriend_pkey" PRIMARY KEY (id);


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: Distance Distance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Distance"
    ADD CONSTRAINT "Distance_pkey" PRIMARY KEY (id);


--
-- Name: Friend Friend_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friend"
    ADD CONSTRAINT "Friend_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: Library Library_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Library"
    ADD CONSTRAINT "Library_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: Otp Otp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otp"
    ADD CONSTRAINT "Otp_pkey" PRIMARY KEY (id);


--
-- Name: PanCardDetails PanCardDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PanCardDetails"
    ADD CONSTRAINT "PanCardDetails_pkey" PRIMARY KEY (id);


--
-- Name: PhoneOtp PhoneOtp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PhoneOtp"
    ADD CONSTRAINT "PhoneOtp_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- Name: Seat Seat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat"
    ADD CONSTRAINT "Seat_pkey" PRIMARY KEY (id);


--
-- Name: TimeSlot TimeSlot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TimeSlot"
    ADD CONSTRAINT "TimeSlot_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _LibraryBookings _LibraryBookings_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_LibraryBookings"
    ADD CONSTRAINT "_LibraryBookings_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _OwnedProperties _OwnedProperties_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_OwnedProperties"
    ADD CONSTRAINT "_OwnedProperties_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: AdhaarCardDetails_adminId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "AdhaarCardDetails_adminId_key" ON public."AdhaarCardDetails" USING btree ("adminId");


--
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- Name: Admin_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Admin_username_key" ON public."Admin" USING btree (username);


--
-- Name: Amenities_libraryId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Amenities_libraryId_key" ON public."Amenities" USING btree ("libraryId");


--
-- Name: Invoice_bookingId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Invoice_bookingId_key" ON public."Invoice" USING btree ("bookingId");


--
-- Name: PanCardDetails_adminId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PanCardDetails_adminId_key" ON public."PanCardDetails" USING btree ("adminId");


--
-- Name: Transaction_transactionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Transaction_transactionId_key" ON public."Transaction" USING btree ("transactionId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _LibraryBookings_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_LibraryBookings_B_index" ON public."_LibraryBookings" USING btree ("B");


--
-- Name: _OwnedProperties_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_OwnedProperties_B_index" ON public."_OwnedProperties" USING btree ("B");


--
-- Name: AdhaarCardDetails AdhaarCardDetails_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AdhaarCardDetails"
    ADD CONSTRAINT "AdhaarCardDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Amenities Amenities_libraryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenities"
    ADD CONSTRAINT "Amenities_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BookingFriend BookingFriend_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookingFriend"
    ADD CONSTRAINT "BookingFriend_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BookingFriend BookingFriend_friendId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookingFriend"
    ADD CONSTRAINT "BookingFriend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES public."Friend"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_libraryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Distance Distance_libraryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Distance"
    ADD CONSTRAINT "Distance_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Friend Friend_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friend"
    ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_libraryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Library Library_libraryOwnerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Library"
    ADD CONSTRAINT "Library_libraryOwnerId_fkey" FOREIGN KEY ("libraryOwnerId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Location Location_appId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_appId_fkey" FOREIGN KEY ("appId") REFERENCES public."App"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PanCardDetails PanCardDetails_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PanCardDetails"
    ADD CONSTRAINT "PanCardDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_libraryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Room Room_libraryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Seat Seat_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seat"
    ADD CONSTRAINT "Seat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TimeSlot TimeSlot_bookedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TimeSlot"
    ADD CONSTRAINT "TimeSlot_bookedById_fkey" FOREIGN KEY ("bookedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TimeSlot TimeSlot_seatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TimeSlot"
    ADD CONSTRAINT "TimeSlot_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES public."Seat"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Transaction Transaction_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_libraryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _LibraryBookings _LibraryBookings_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_LibraryBookings"
    ADD CONSTRAINT "_LibraryBookings_A_fkey" FOREIGN KEY ("A") REFERENCES public."Admin"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LibraryBookings _LibraryBookings_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_LibraryBookings"
    ADD CONSTRAINT "_LibraryBookings_B_fkey" FOREIGN KEY ("B") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _OwnedProperties _OwnedProperties_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_OwnedProperties"
    ADD CONSTRAINT "_OwnedProperties_A_fkey" FOREIGN KEY ("A") REFERENCES public."Library"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _OwnedProperties _OwnedProperties_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_OwnedProperties"
    ADD CONSTRAINT "_OwnedProperties_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

