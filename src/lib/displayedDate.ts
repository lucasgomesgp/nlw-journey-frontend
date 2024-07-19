import { format, setDefaultOptions } from "date-fns";

import { ptBR } from "date-fns/locale"

export function getDisplayedDate(start: Date | string, end: Date | string) {
    setDefaultOptions({ locale: ptBR });
    return format(start, "d ' de ' LLL").concat(' até ').concat(format(end, "d ' de ' LLL"))
}