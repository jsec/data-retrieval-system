import type { Props as FlagProps } from 'country-flag-icons/react/3x2';
import type { ComponentProps, JSX } from 'react';

import AR from 'country-flag-icons/react/3x2/AR';
import AT from 'country-flag-icons/react/3x2/AT';
import AU from 'country-flag-icons/react/3x2/AU';
import BE from 'country-flag-icons/react/3x2/BE';
import BR from 'country-flag-icons/react/3x2/BR';
import CA from 'country-flag-icons/react/3x2/CA';
import CH from 'country-flag-icons/react/3x2/CH';
import CL from 'country-flag-icons/react/3x2/CL';
import CN from 'country-flag-icons/react/3x2/CN';
import CO from 'country-flag-icons/react/3x2/CO';
import CZ from 'country-flag-icons/react/3x2/CZ';
import DE from 'country-flag-icons/react/3x2/DE';
import DK from 'country-flag-icons/react/3x2/DK';
import EE from 'country-flag-icons/react/3x2/EE';
import ES from 'country-flag-icons/react/3x2/ES';
import FI from 'country-flag-icons/react/3x2/FI';
import FR from 'country-flag-icons/react/3x2/FR';
import GB from 'country-flag-icons/react/3x2/GB';
import HK from 'country-flag-icons/react/3x2/HK';
import HU from 'country-flag-icons/react/3x2/HU';
import ID from 'country-flag-icons/react/3x2/ID';
import IE from 'country-flag-icons/react/3x2/IE';
import IL from 'country-flag-icons/react/3x2/IL';
import IN from 'country-flag-icons/react/3x2/IN';
import IT from 'country-flag-icons/react/3x2/IT';
import JP from 'country-flag-icons/react/3x2/JP';
import LI from 'country-flag-icons/react/3x2/LI';
import MA from 'country-flag-icons/react/3x2/MA';
import MC from 'country-flag-icons/react/3x2/MC';
import MX from 'country-flag-icons/react/3x2/MX';
import MY from 'country-flag-icons/react/3x2/MY';
import NL from 'country-flag-icons/react/3x2/NL';
import NZ from 'country-flag-icons/react/3x2/NZ';
import PL from 'country-flag-icons/react/3x2/PL';
import PT from 'country-flag-icons/react/3x2/PT';
import RU from 'country-flag-icons/react/3x2/RU';
import SE from 'country-flag-icons/react/3x2/SE';
import TH from 'country-flag-icons/react/3x2/TH';
import US from 'country-flag-icons/react/3x2/US';
import UY from 'country-flag-icons/react/3x2/UY';
import VE from 'country-flag-icons/react/3x2/VE';
import ZA from 'country-flag-icons/react/3x2/ZA';
import ZW from 'country-flag-icons/react/3x2/ZW';

type FlagComponent = (props: FlagProps) => JSX.Element;

const flags: Partial<Record<string, FlagComponent>> = {
    AR,
    AT,
    AU,
    BE,
    BR,
    CA,
    CH,
    CL,
    CN,
    CO,
    CZ,
    DE,
    DK,
    EE,
    ES,
    FI,
    FR,
    GB,
    HK,
    HU,
    ID,
    IE,
    IL,
    IN,
    IT,
    JP,
    LI,
    MA,
    MC,
    MX,
    MY,
    NL,
    NZ,
    PL,
    PT,
    RU,
    SE,
    TH,
    US,
    UY,
    VE,
    ZA,
    ZW,
};

type Props = Omit<ComponentProps<FlagComponent>, 'title'> & {
    code: string;
};

export function CountryFlag({ code, ...props }: Props) {
    const lookup = code.toUpperCase();
    const Flag = flags[lookup];

    if (!Flag) {
        return null;
    }

    return (
        <Flag
            {...props}
        />
    );
}
