import part01 from "./styleParts/part01";
import part02 from "./styleParts/part02";
import part03 from "./styleParts/part03";
import part04 from "./styleParts/part04";
import part05 from "./styleParts/part05";
import part06 from "./styleParts/part06";

const fontImport = "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');\n";

export const welcomeV6Styles = fontImport + [part01, part02, part03, part04, part05, part06].join("");
