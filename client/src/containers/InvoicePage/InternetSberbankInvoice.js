import React, { useState, useEffect } from "react";
import Icon from "@ant-design/icons";
import { Row, Col, Form, Input, Button, Checkbox, Collapse } from "antd";

import { ChevronRight } from "react-feather";
import pdfMakeCus from "./pdfMakeCus";
import { getRandomInt, gererateQrCodeText } from "./helpers";
import Avatar from "./ImageUpload";
const { Panel } = Collapse;

let sberabankLogo = "";
let sberbankPaymentCompleted =
    "ImageUpload.js:40 data:image/png;base64,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";

const InternetSberbankInvoice = ({ form }) => {
    const [iframeDataUrl, setIframeDataUrl] = useState("");
    const [number, setNumber] = useState(341834);
    const [documentNumber, setDocumentNumber] = useState(517247);
    const [date, setDate] = useState("29 ФЕВР 2016");
    const [time, setTime] = useState("16:11:39");
    const [price, setPrice] = useState("2500");
    const [phone, setPhone] = useState("9995817317");
    const [cardNumber, setCardNumber] = useState('3485');
    const [authorizationNumber, setAuthorizationNumber] = useState(
        getRandomInt(100000, 900000)
    );
    const [name, setName] = useState("НГО ЧАН БАО ЗЫОНГ");
    const [print, setPrint] = useState(false);
    

    const renderPDF = async ({
        date,
        time,
        price,
        phone,
        name,
        authorizationNumber,
        cardNumber,
        documentNumber
    }) => {
        const header = [
            {
                width: 120,
                image:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAm0AAACvCAYAAACvtOkoAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAL2xJREFUeNrsXT1y3ExzHrEYOSF9AkKRy064iuxM4Am0OgFBR860OgHBE2iVfYk/gSd4lycgmDnTbuIqRwJPYDJxSqOphgSuloseTA8wAJ6naov6WQLz09PzTE//vHl6ejLA9PAvf/+3uPyxLD+n5ee6/KT//e//VWBkAAAAACBMvAFpmxxZi5isfdjx33dM3nKMFAAAAACAtAH9kLXj8sei/FwKvg7yBgAAAAAgbUAPhC0xP61rR5a/CvIGAAAAACBtQAdkLS5/ZOXnxPFRN+VnAZ83AAAAAOgPhxiCUZK1iMnae6VHkv8bXa/GGF0AAAAA6AewtI2LrBGxSsvPJ8XH3pufV6QZRhgAAAAAQNoAd8K2YMJ2pPTIR/PTD25ZErYHjDAAAAAAgLQBbmQtNjp+a3UgbxsAAAAAgLQBSmQtMrp+awREiwIAAAAASBugRNbIb42uLc8VH6vmt0ZkEhY6AAAAAABpmzphS83PBLmqfmslyUoV2hYzmYzMz/QgGWYMCPDAMzM/o6Dp53EppzFGBoBMASBtgKZimDMh0vZbW7gGGewpi3VdPjvB7AEBbKbVhrrrsPMWlmGgJUGbvaKTz+BiAvgC8rSFrSRmTIi0/daIrK0VFNi+sljn3P4Y0adAR2ulTtCkBxz6LkgbsE+mqp9SmYowegBI2/ROdD781oisrRTaJ00vclp+ciqj5UoSAWAPSYtNe5cBes4KIwooyxQAgLRNhKwtTNh+a5mxu6atiFsM4tarXM3YAhDVrAGvWQRy/lnwZ923tZT7MOfNdK64PrDBTntdQKaAQQE+beEokMT8tF6F6rdGZM3lmvbRIEBhaBaDOshSu2ZCt+rCD6y2qdLng6fX3Jd9iSA1kyNqPmXqsZSpY4w2ANI2TiUSM1nT9ltLXDdWT2WxPmpc0QI7ifWCN6OTDl5JJI7mMdO2oHLgTeJxU32Bsv1vIEGT0LMkU+cdvRIBLgBI2wg32dTo+60lGpFLKIs1adJviw3Pa+bYl8ToW5slQLTfeNdHwoeZU8gUMAbAp617JeLLb42S4y6VSEBmUBZrCKQ/65msVThlec4CkjkJ0SR5XBtEj471MLPsmKzdsyyBrAEgbSM69WlbEr4yIQrBb20bKIvlR45Ihi4Da9ayZV/o9z55bNej+e2LRxtqAXkc/froSqaqD2QKAGkb4akvNeH6rQVbFgv4Y65WJgzr2jZWLfpCG92pstytayRtjav4ya2RzIMug0wB0yBtVaqBqZ5C9lQLcFUiWn5rRCTV04sY+K35kKUqn9hJgM27bjHfrldXdQsaNlOgsrC5ErY7yBQQMrwFImydpCfl0ySoFtB2k1ooFXX3VRYLfmv+CFuuQK4rnxsiO/s2o6j2kciIldM1y99fLTdUIq45cv4BWzIVlz9uW/zqpiZTOUYSmCRp23P1cWVGboVhv7Wl0bNeqY1byGWxAC+E7ZE3pGpTemjZBtoQ67nf6m2xynPGuqGw6M+GZXYFqwewR64Ki0MoyVRmOso3CACa8HU9+trVB1meFpROYmz+Tp6ilW6YEBWObQu6LFaN7D7n58Lm/GLeVi0I27NPoRbRYQtEzjJUEclqvmzXcSLsD4JYABvdISFsG9ZZkClgsFC3tFlEto1iAXnyW1MbG19+axplsV4hu+QflWBpPo8Nzf97y7lRSf3Ss0XkpuzDHBIACGVqLTgs35UyFWO0AJC2l4unja+KijWpB0UxVb+1hYb1poHsfg6ZeHQkXyRbXyyJ/jzkdSTUD7QGIlhbAaFMkdX3u0CmZrgKBcaAQ+XF04Zs0Kb9ofz9wfi7eagWQNDyW4uNn/QiKn5rQrL7hU7PE486Tm3I9ECskxLr2QKEDbCARO6XIGzAWKBiaVPMuRT09Y6nzO1afmvVRh+635o0SGOyFhfLXFODuU4u+/XQMPejLd7OuoM+EX/M1sGqiuylMfqVFyxE+Wd9T32pglN2Ief+5D4Jk+C6fRR6hI0iEY95XYaiHf3fmN/R4evaPCBYDKTtl0C1DeHfRxaSUCwtIVcLCL0sVm3DahOkMTnfJpa1H8Kvb8rxmQ2kXxIdcTGmAKVakfK5w9qkQ91SSxeyfElIfrZNtvjQlbTQg1W0ZqZJnoRXo1da/rc9kLSYZWempNuraPJMc29lv2lreVI0BDQd9MTpXGqHq30otPQU60WRDq/kWOV6lCwx5cvPjN61HJ0cbstnqmT9dyRE1CfNkihq1QJCLoulRHY/cKTxlPzbpBvMo5FdN4aCWNCf1RgmUNkiX7mPaLko0JqU+OHmbKHRcAehwxr5Z6aUAFeRRMWC72QDkpt6VLaPJNo0f2TBP2d50orOtpInZUgPEbmFTDX1505Drni+pcaui+oPB1ojR5PP0TkXTEw0QJPxgxY6E6guF9CChUyLsNGmRH5rM1fCRpsCRxZ+U1zcJIhvy7YtFPzqjjk7+Q8FEp8y+Rs9WMal16JDS2TctMGuRnCFRXJPxPPWw6ZL6+i70KqhRiI4MvOL0bH00DMu6ZlKa7pJpm6GskZ4v/nO+00XVU/es2Fk0gFfPc53ZEEkr+qc4UC7MfzwGROUR6XHkiAXLNi+B3POfhJaiopwzWTNyYJFE83+TrdG76qWCDZltI81FJwHsmuM0Hw8AiTSORug9bHpajwf8sTxqZnk/oPnV12yDuhCFr8b3byTdVlY85j5JG1Dkqm+yOWnjuQJeHk4l+bfvN62THtJrsvEJGVhSI2Oczx18AuTAjXn+C2l66NawJT81jKD0lhdkLZ0YEoqFnwtbziVxkzeK0fsk4aDSMHP9F6eSLHMmBR0vWU8B6Cce+4DjVVOstHmypdl4khBpuo/mwIa6kXjVfcfdjHqa4mSPBVD9P0bKDLhYehm1xr3WjCeN9ukRt60/N3+0vLx8FgtAH5rPZPdAZ6+JAv5cYDO+jNBn4odRG9u2vn3nPCHZJIsU5W/nPoBoAfCVt9oV9rkoWNUxK1NdGejlW57b3D0GTtieXrPz/IhUxR08qGnuXi24CI1inc9nwnnePPaIf6wi4by5hsrJ3ytfDxaJ3z1VS3A6OVb0y6LpRbYEXqQxgAhDSoY4iYdNfz/uiZTC1ZWmoeUugO25oGlTZmxG/6dgi02D7zWK4uPzeExa0l4QiNuKyMLKrAhbZvaHCUsV75kSivpeN4jaTOszxNQK2+ELRGub9oH49fk6bDLRvOpcKVMlmgQ5jZRSSFXCwi9LBa3UTu5sBrZHTCkm9YQSdtMIFOZcUuNIcUn1hdzhUhMGx3yaj7G2rrMWDdK1/8Rf7erjbayLlF7i7o+YSvWrAXxfD6A04ZmeViTyJT2obxpD4odZSrfs4mva58HHv9iR59pXKo8enPLQz9Kx/kjbDQf34RrbL5vH7TK08YCsTAKJuE+iph79FvTuqYNtixW6GR3BItaUj+RNvg3A+xbU1LdPvDIp9l1yz6REr4Vft26LJtlguW3Un1s2e464cykV7EtdbtVYmXpeulBphKXK2sOgjuukeOVY/BabOxubM5sD/flO558PFf47lywn19ZGHRSwR5sVcfW0oXiXZNOso0erRYipeFIXdJwkCCyk907Jj4aqPzd8rrzcy3q8rvRjbr8yFGXroSNxqFQJmwUvRsp+dXNeHH8ZXRTjJCAJihb9IxT4ZgNEUeBtil3iGBMhd+7aBPsw7rxRvj1xNMYVWt0bkNEarr9wsgzCJywHtRcL33IVOYYFUtjfcx60TkZceWaZORpuGIDaJJK4kiZUAdeSLjEgcXL4y3CQwTDOQ0HNZJZ60ejm9+NctBU1w1ro2fRe2TmHrk6AXO+NWrbN8WN7YZP3qlSvrVgye6IFrZUya8H2LeQN4Ej0yJJ5g5d+BquHQ9NiZD0+CBtV65rlPtu07aFcPyPA5epVds2+tCJvA9I5yGCRlbFSnjAEFeDsbG0Za8IKKXhKFyVMxEgNo9r5nc7Z3KpmW8tcg2NZstflYRT68RIfmtnfCouFDZb6mMRItkdIaQKfqoWyQ2vvc8k4yznb/iq+B/53z4buWXqhcWmRcLaRCjvrgdamm+Jle5EIefZNnIlwrBinS6dCwlpmHUkUxf8Hdv96MR17j0Qt5z7DNLW3YE183G4OxS+PDH7r8XUyk4RIeIszdr+bi6A35o72VXzW+NNdj6UupuKm9AQLZNtN4EqynKvTw//X86fZcuo5gUHMj0I17BEL2kF1WRCfRGHKh+s0xOhTpkLiaqLTO0tYl+Tqefxb6m3xTLVIXIT5rXyGAlbItQT17b5FqXRo9KTaFV2yimsvjLn8uYsZas+sDewocUkkjIKMuIy5CCNrTFMK+XfIuIsVIzZ0hZZrjeSwcxRdyzYki1Nx3HEZEEiS9IIOxXiQeSi7MtGsNnGHsmOBmjdfhOOb1M/bA5rjzWZKhxkKmWZyi1kamHCSoQN3+FuCFsslPWNaWGRPRQ0QHpCquNTRbpcMu7zIos9ZdtvWugq1QJCrxTQRxRvyzFMdxDK1AyoIDSwd70tNAk4XQex3Eg32YVQlmLBd26ULSwSC0nQVmeaW75BaZoLyaHxWChTqmmE6PBpKVNJYKSN2n1pAJ+EbWZkaZmIsMVtZPNAKHhtoOnvlrO/22ej5+/2GshKGLkSNvZbo0WiWTyaLFdnHFlUOLbv2JPf2mctvzVBrVXbiDOge0QS64oPiylbeKWbptSfSqLLcuWuSCzVJwOQBWnKEA0CmmoEY70iU1Kd48PXEAiXsEkjRRtzsbUmbRZRUk3K5JbTcESOC2bJm8BXD2NOhIiiLheOeXGO+UT5w+hGXF5wNFeuIFwJbwSaQRoqZHeLUEqiflOoi8GTNm9geZSmSokFSllCjrR9ywrhugmdIOQdyszao0yttGQKGBUkkaJVfsii7UskljbNNBzk77ZUyO9GVxlvjU7eKurfGROiwuVBnP6EnqFV2uk54rL8zJTyrcVs/ftmdK1/zmTXgVCecPAEALwG6dqZOf5/paPynvp5HPg85F3Og2ekSn0BRgCLSNHE1cf7oEn5eEjDQYSmaBFmv922gvO7nbUklvWrvNxxwmLOZP3F6KYXmSnlW2u6ZuyV7CoQygXUBrBHV2RC/dW0wUZCvaLdfql+Og58HgqlRx0H0JdcuO9EWIGjJ2xkaJC4GF1ouA0dCgVUOw0HEZtL7qyTwzovnsiyHqZK0Wi+7pUybCnuuG25gjBVoeqa9ffUgjRqY5g6ytV7LpxdjFw/HBugLWg9NdXzjBz/n/DgeiB1gNQJuk/cCfRlPCCZatJb77H0Rk3Y5kYWKXql5bcrLhhfS8NRkTcNYazKTjmnhiASwdakffl0Xi3a3IIMkWL+pDj/2hGXiamlx1CCCtn1RCirZ40ZQ9iUQ8VaQNo01sqJQYTelGSqk1yi7F8+44PDrKYPjgYyVuTXPjbCRuMvIWLXrgn5W5G2GjkiQY2Vk7ASAfxePtMpCWstn07GbauU9IafmytMVGr0LVdLrUndkx7DBSpkd4tQLpUVTjJg0iY9rETYJ72P8T7EGEbAVqbogNpmT2M9ORccNoDuCduxkeWBvLNNnqtO2moE6Tl5pTKJoVPLnDNJpw5tK/g5pGS1iqYHXSlA6ZpxG2pkt0YoaQx9ZOU+ojkaaIks6fyDtPkfYwDQBllkRDrUk0sLoI9cyAXUDQmHrg8YgL+bK9EIulLAQEpjReal5dMXEjPM60OpHMA/BgBGih6SyAPtYONbTEmlY818gQcaD+E0HLRhaqXhMOa3v1veR/4hzhVGC+i70Y24/MgRlxqEjca8UCZsFCmsZZ2s8q39MN2Y+D+4pJPpC7ygH4VjivQmwNQh0Z3xwAgb6XLNROyAPzywgUCis+lWKdfclw40e6KQhuM16wL5u2VdbcieKgVcKVYKIJ9CUlwUtaJlQie/tbdaWcQ9EUoJhkpq1iPtXzG2DRYIYtMcTXtZV37roB0biI4a11lb6OJn4qb17sMt4SFSNHO9VmyZhqMJKv5uAitG6H5r2teMQ/Jbk5KabIB6IDcyi+4YSduYcOVLP00IGrooCmyDb9LptkaAnA96xY41VuwKGmPdfAvxUptXsqBdCAk3lcnLNIISDneceOlKUiVasJaGg5SYRnqMur9bquhz5ctvLVEs6g6/NRnigeqAlXB+KeAi8VGrs0fMAnmHRmJc5NLbDw0dK7FKd0HaNOY6szBqqOXw7AGfjZ/SYn0aCJ4TdzN/kPCbc0p74krcDl85xdPGS/5B5N+0dLES8e8uOFghM3r53b7VyFsrIfYUcXnPZE1lYXlIj/HIz1sq5lvTIuUaGGQUKZ3Gy3Y/Cuc5NcOxJuYCMhrKBrsW/H+T/kLZov36VoOUSfRWKAeB+wZjgWQ/fOQ9Zcg5Gtc+yGY5hr1flVMJR5ZticGCiFvhYo0/eIW0VSBlWzBxcO2YL3+3W/Z3iywm2qYguQ0ZUimLxW304bemVhqL26hda1UL8UAVm1Qpn2isyY4gkbPTDvxVY4W2SvoCS5v7uiwcSV11ePN9GJg59kWaDmI+cMI2BZA+lvoMXrro74Mt1r+LHNC/kVWr4DtxV/JW1TP9bPTq9BHxIktF2qT8WxQkl4AqBUQapZ24TiiRPvI90DL7klmd6oQminVC6TmatVZB2ux8W5ZDiJS1iJL2PWcSi0ZTWyVr59QATnPcJDN84LwPQKZmjjIlad/1QK9DJwWWydiC03xrS9wOLASIriRvOQVHpNBJ2qDoOVdK43bERGy9azAcC5LvI0MUcblQqGN6zFfIP4xuipELTjHivPC3CGXIoemnHZyyfRGcjYW8D+X0LUkD5G2DtThsNq2RQvl9U8NcSVYkBNu3TEVCHbh+Td8Lfz+F2IyauFnL6EELASdC8YMIhutJn/O7kVBSfrcbpbGr/N1yJmoRB0PcKpOhMyZDhYIC0L5mfGQyPFPMt6ZNKH1jqL5FNta29yzboUNyYPAZFSs60TYdbCwOPsil96cOSYzMKr/SlCmP1ujEsZ0ifzit0oFApwdvmyoIK9s8tG1IWwUiGAUTDteOkr8bKbozo5dL5j0TNW2/tQtlvzValJrXjFPxW+vtlO150WeWa+B8AMRNslZOfCQO5k1b8lzpoVEyN8kQkzx7hpTkaJK2I48EWtKfjSPpAmEbrg7/LPz6ERM3sb44YMUWtSQN9DtflP3diHVeGD1/Ny0ypFkpwMc149T81kZJ2hi2B6HzLpNPt1nXwvW88DSWXVt4jjz1ZZBgK5vEQi8mOWzRkPi1pR76sxDq7QyzP1niRjcm18KvkyyJqyZUljbXqyRtfzcS9sjo+bu5QK1SgEe/tY+KfmuzgfitNeF0wAs+N/buAue88EO9FpaQovcalvu6LBtZ7rtHC9Im/d4i4LnokrCRHpde+S89yNQJZwrQ7I/0ea6kDeljhk3c6LAivTURl7s6UBaO0P3dbECDTZaruZLlivpCz1H1W1MsjeWj1mrfG0Y84OYnxj41Di3877YpcDqCdENONcgO6x/ppinOWciEWjIvZG3LpnxNyn1fGZml877FLYZUpi4VZUran2sF95QjLZcBbnsCKtU54hbEbdZI2pgcXRm9K8nK3835hOPJ362JDJHf2kzJcjXna0bNFCNkdo20yuV4qLUaCqKhNpwV/rzlmjznw1Pmy9rDJJ98t1bC/tB1liQy8Mg4Wgx5g8qNzNr6aOwtPFJycWrCtn76JGyRxRw8k/U2e4ORX0F1KVON/bHYW1IX4l/LSSrV75EBtPV4YqHHK52R7CVtNeIWWSwCifK9ZH+3uULn6/5u957GWNNvrbpm/Mvo+q29Y781jSADH4QyJMwGvuBtI5F2kbfvvAYznu+opayQj+OCn0Pt+l/zM33OBwuLZmqhO/I2eoPbsrbZXFuspWULJZxqW914PpehyS1fcdvMwZ2Dzu1KpmwI25XwdmZjIT+RZZtnLBu2+v0EKWu86HEbuaty4652zfubp6ennRNu/NTiXFgk22w69SyM3Mm4CdesvAulti2NfmmshVZWbE/zGyLuuArH0K0WiZEVJbZdj7+sEFv/Vx8ziYx8pVyFwr5klmuD2rncJ/u1CNHEUqZbywcTky+Wv1b5ztEntyGLvGYjPojEW/18J9WrFkXDP9skC+fNZc46+cRyTCKXQyiTk0+WMkVyuNr3XiZ4C0uZ2rBxwUe7r3mtruvzzWNfyUYlHy6GApqTudQaWL7/SfC1M09lrHLB/FxJb6XYKnnpQ28In71rLl6UndxJ2raEdml0HdKvmYBoWIoi41Y7VLUAL0+KFpH8NWGK16A+CGXIuOfqG4OHhxq0vYwzy+C6pU6h9fpgficsJcV5bNoFnWiQBcmG0XQYqw6Ka/O7TFa1CVd/bhqrC6mlyoK0bbexMLtTUFRE4aTlHMSuB3lHmdrwuOdbB5b3vvvD+9ePgNXOhg8YxT75Ammzai+N54eWskW/uzzc9y0+3a74VJkqbRhEGJ7N+q5khC1jCZ/eU4uFds9kLVMSnKDJrSdCOQScjKUjJKt8LbkKsF90pRJJLNUkz7xe8hayWK3vD47trTZX17U1ZyJz5CCfJw4kwdSIRuZxDZ0Yfav8o1G6eXGUqVOF8W9FQGm9lO2+DvgQfcqfKwNoITF2V+0VjlhOZgdC4apKTn1VargPfzdSXE3+btqVAnz5rb1V9FtLRu631jhHIyJua7ZqXAfYvLllP/rKY6Zi3anIgrErW+MLQ5Pxag4y5bXR11y4yNSiwzbfK+7hgJvOaBtUmR/YvIz9Vt4aeX04ySnur6rklIY1ghXYrkhYtUoBtdJYmukxtEtj+ai1OkQcj23Rc/6frqKp1Ulbba2edbzJkt6KNAjbDrLQ51ycDii1iPoc9EzcNi6HgA6J/w3vjWmLd+WgW+o6vO3he33Q4oUFW7XOjF4U53PJKY38UrX8btWgqFUKqIVPa5fG+qxYGstHrdUhIxrpwq9HU2+GOM4s7zPFQ2DTGou13A1eIQt9WjFCt7bRXnHhaw625qIrmbri1FBrJfl59DTuHznf6EMtBQXQvw6nefhoOe/5gcMLc3Y+/qwobESE1hrh8UwuE8VKAQmTNc1rxq986lwqtM8HoQRpC3/hZ0ze3vEhpUsrwz2/82PbgI/aIdBHKp/KHUJljQkOiws+zN51LAY0bqFa2jbmd73mrKM14Vumft3aBEw272vjvtp618qSLBQG8CWrKyN3PaOAr2Jv9KgNYTA/za6aRcVVgwUc+hYbuyAHCWhhqtQIrRFKauMJlsEfuNJUrkMA+/HN+fQ+Uzxk3POhgA5BuY8rLpZlartLsAFdBT0HUfm06jT0gxTxgvuivS4fqzmwnYcW0aMubVtp6TjHuajSwQxCpniOFi3aW0UYZhJDRS11VrJPRstnvWl4DqJH9XRGsmc+bshi+uaf//NfE8UoSnpp5oHgpD4mXNAXmkDtfGuJYooRH4RybLhmM/RksZXHqbLI7FM69bQaz6koul5/NfmOuc37rv/yqs19tFM4/jHPQTXukjX7aH6nAlnzp3Ahyxak7av5nYKkCQ+1thWBr4XByBSTqurgVV+7dTyPu+shimV0tmtMmgiPsPJR5kM2+JAXNXwtt8g5FzfoRmMaUqAoHrzrskr64jl3IpG2J6Ofr4xeRNcRmkW71RLgCk8f2vnWFsrkWJtQjhWjSLALAIq6WULazkIkwAAwdRzUTn23WoWmt5ykg/N3a2Dt2n5rmqWx4LcGAAAAABMnbXVi9EOLGDFRiYxecr4jJlTrfQVV25w+PaTHIB+ItxopRmqEsjATzbcGAAAAACBtu0HEoNAgRrUUHG+ZyGiAiBUVVF275Hfj9BjkuKmZHoOipc44xLpQIpRrJpQgawAAAAAwUewrY1VVmn/273L1b2ACM1f2d6Nn0LXuDbdRRJJqfmuXimPpw2+NxukDxBQAAAAAAEmetooYrQL2dyNiI7rW3bpm1IIPv7UfIGwAAAAAANiQNmtiJCRvRHAis7vkVFu8eq3r6ZqRIlp9+a0BAAAAAAD8QpXywxZDSGFBvmULJkHa14xDSJEC8Fwh5QcAvNA1SPkBAAPFYcvf8+HvlnDNTCJvGkEBp0Y/87dqlQb4rQEAAAAAIMWB4+9X/m65or8bnQR91IxzQVXDcKbot0ZkDX5rAAAAAAB0QtoqkGWM/N2Wiv5uM6Pr79YWv4oDK/mtVVe2nyB+AAAAAADYkDZNixYRkYKJiStxq/K7zZg4dQ3yWyO/jkQx3xo954tBvrUukWMIAAAAgDGAfNqISJwoPpMIyRcmbkmg/m774MNvLTMo6g4AAAAAgAMOPD6biKAPf7ePxo+/m0+/NRA2AAAAAACcSdva8zu0/d1W5Scyuv5udP0awW9tlMgxBAAAAMBYSNtDR++q/N1SjYexv1tk3PzdyG/tHfutaZC1OfzWAAAAAADwgcqnrSsQkbnkzP+U323lSNyIaCV8DUkf6TXkvcb7a2RtZvl+oDusMQQA8Auk76+E35s8/u9v/3T8D//xPw+hPxOYDqgiQmz0k9BKccfkSWVjJUsXk6fXAivoOnXJVjqN9x3z+84hSmGinOs3GAUAAFqQKzqM57RHlSQrU3omPYeeG4O4AW1JGxGP/+25HddM3lSEmK9gya/sqON3AGEBJawAAGhDriLz00pf6fcLV+LGhK064G9A3IBWpO3p6YkIyFMAbfFlBaOfaYfWPCAc3JTzPscwAABgQa5oz8jNn7Wgv9JeYku0+HlE2Lar31yXz0ow4kAb0kYCGoo/lqq/mRbgtzZIXGkdAgAAmDRhq+9PqcTqxs9amP03MiBugBWqgvHrgMgIWbD+KkmSqr+bA1mD39pwkWMIXt1Q4h3//FBuIAjcAKaM4z2ErdqfvpXrh/aEFeuYwvwOeJrxh9aXpK50jCEHbFBZ2ugk8CXQNpIvWqpRSqoFWWs6JQFh423XchMYMZvVNhH6REZ+rX/Pm1HOG1IO/xtgIusmLX9cdvS6s3Jd4XAJWJM2UujfA27ns7+b+enz5n3j4JQkqYHf2pDxWMrK8dQ6XW445MNXfbQPGxsmcctyoykgYsCI11Fm/N+uXGhFpQITI21MVJ4G0F7VuqA7yFpsuqlvCvjHZIIQONLtudav6c4qTO4LGTYdYKRrig58K497wddy7Sww0oALacsHRFbumLzlSmQtYrIGv7XxYPRBCEzW+pZbOkgluOIBRrrGMg/rCxY2oDXqBeOHpHSJXFIx+sylGD0XdadNbw3CNjqMmkSw300IcksuBLdle1ZsnQCA0YAjOz8anTrX5F7wDoQNcEHd0hab/iojuKCVvxv81saNsVZCYOsaXducBroW57C6ASNcdy6BaeI0IQAgJm1MZJ4G3BeRvxv81iaBUVZC4DQdKxN+NDOuf4AxE7gq0Ge25/BELjxkCc+QRgfwSdryEZCZnf5u8FubFD6X878c2UaRlD++OT7mkTeSB/M7r1QdRAqb8lSBuAHAy7VJe0vEf10jNQ7QJWkLOV+bLW7MT1P2A/+8xHRPBu/6TsocEGGjdfCcBNQmTQdb9SqLQlsXAhA3AAAAj6Qt9Hxtba0LSI47HdyXhC0aEWEj0vRXC5l/9vPUOPUzgUtNOyv8x7INK4glAACAMmlj4lYYOOcDw8XXkrSNIv8RVzTILQ8drYpaWxDIpaV+IAI5QzJeAAAAdxzs+DecioEhIxtZX6SEjcgRlcRZ+PKpYYsZEckbi187GtmcAAAABEXaoGCBoeJ+LL5snIdNGhBA+Z9mXaTaIEJYfsjidm3xa+/ZLw8AAADQJG286d1jaIABYhRWYo5GkwbO0FqNu75+5KSjNsRtieS7AAAAbjh8TcGa8USRAtNBNpJ+pMLvVclse0kxQMSNCaYkQIGuSRcWfQOGffAggk5X6TH/U7z1FZIZshBvy25efugAskZ+MwD4E38EIhA4p9kPDA8wIGz++9//azaCzc5m7fWeUoM358LIfO/uy/ZGls/PBeQx9tCvXPC1THv8he/1cuBx6QvLLc1DlXRWI5iNDiUrbluuPM5LbmenclV7f1L+SDRlmwOXln2sFwvZXYCMu2Gnpa3c/IqSuJGz8QcMETAQZCPpRyr83l0IOdDIylcqa7KgSfLIndBmZdnuvpJ9S96rTSSiHvubt2zvnMmHj7JqdBCgZOjn5bvIDSBRJG+zvsaaydU3D48+Nv0mx38vbCPggIM9/4coUgCkrVtlfsyboATBpDVhEnYn/PocovoqogHJKhE1sgh/Md3UwSXL3W353mwEazyDqAPqpI1reCIgARgCrkt5HUPpmLmRXTPeBHjFkAq/9wEBCaNA0dN7zwdO3NKOSC4wNdLGwIkAGALGUmd0PtT+8rXVvXI/gUDB8/3YI3Eb3JrnyiKfID2AT9K27HFhAoAEdyOqMyrxIb3vIh+bZ/IcQ2xHgT7l8BOToKEQNrIuw+UI8Eva+MoJggaEjHQMnbDYgEJej9K2gbSNAyusfTEygxrYgAIOhQvjHEMFBAiqgJCPpC9SIhNsfynBL0f5NaV7oCjS477yyw1cBq5aPtdHVOE+WaTAFLKAP9S/V7cSc/QpfaqcbnRtbuPvRZU2otDr2nJ0NTIxAN2QNk7/cQ3iBgSIdER9keaYC52k5kJdMRtAX0IkxtYyzyXR3ntoS52k3/B85tIgGSZbFeEiq13KFuelBXmbm4B9WpmYppBcoDPSVtscQdqAkHDPEc5jQST4zmYA1ikpaYtB2kaBuWYkM1nimLjlQuIWekJtIqO4FgXUcCD5ElnbjF2dQQDwjcXI+iPZoIoB9KOAaPo7qITWIB+pZ/hgIo0wjkKdLLZwIr0H0D1pY5AAIpIUCAEUMTrFAJngo2QtIltjiLH1mEyGEPPV6c1Q28/WwkuINNAbaWNr2xJDBgSAdEydGVLqAgDoEJIDwCzA9YyqB0D/pI2BvG1A37gZUcSoLYaSjw6VVKY9/132N0R/MSJsTRHUNxBnwDtp47xtCwwb0BMeJy5/Q0mRUUBUW2E2kvmfLP7vb/9EvnhN6T3uDSxxQBekjYkbCdsdhg7oAUu+pgeGD9Qf/ROIMhw2YYuEZCwBAQc6I20MWNuArkEpPlIMA0jbSDd8yXjkGKmgkQmI903AZeiAsZI2rvV4heEDOkSCIRgVCgzBC8wwBIMm3XSgbEpg/Ag9BvRC2pi4kZDC4RjoAl8nHHwwxI09wlR5wRpDECRho3UpSe+RonQb0BtpY8wxhIBn0MEgxTA8YyhXiieYKmvETV/Ahh8kYZOm97gr5w8pswBnHLr8Ml2T/svf/+3KIIkg4A8JRy2PFly6Z0ykreuN82kC3dwMkMzMmIxWf96F9wOfFzpQNlU9oGvROdYL0DtpY+KWlsRtblCuA9DHFa5FXyD461GLRMGY15doGreHAcw9yWfCBGX01lZO7/FJcvCElRQIhrQxSHjJ3wIh64CaZWFi0aIbwcFnCD5tkfB72MReosmKGqw/W0leiKgtpnRwt7gW/VoSthXEG9DCgcZDOHdWguEElBDUdUJHkJCYI84FFTKkxBJO9S9xqiAfXROXqPzk5R+/mendtBARazJS0EEshWgDwZE2Jm4kxF8xpIAC5hNMopsLvxcH3g9p+0DaauRHUT66avOM5/D9BOdrIew3rkWBcEkbEzcSZlRLAFzweaJ+bFISE6wFkq+MJBaXe2xmLyCxThYBzfOMSeTk3GG476lEj5UyjoMJoI5DD8+s/NsQ9g/Y4rokbFMNi5cS1ZjIUaCkZ67cV5A2RjnfQZA2JuZtCNuG94VinwzUqwVwUMttYHOVCfqO9B7AcEgbpWfgaNJJnsSA1iClPtnyaETCyk1KEoxwxOQoC7AbifB72o7ZPqqzdJnGKG4iAQHN8dJCr1c5FldjsKyW63NpZOk9ksC74quaEVJ/DZG0MXFbM3G7xRADQsIWjz0fmwC5kV0vLkIjbeyXJfHzedSOpiufl3roT5cbUJOlbR3QHJ9LiYGPeemx70Sspek9isAPiKmnMQJp6wAHvh7MfkkXGGJAcjIFYXuGlIidWuRD6wrSjQDpD15udETYmixXofhGSS3hn0dG2KTpPa6R3gMYLGlj4paBuAENhI0sbHDY/XkCpnGQZr4PxmeGCaTUApNhpl9AQr7XA2rrGP25iIA2+Wjfmwm7dwAjIW014vYZQw2AsKmSMbK2pQNr813d0Rx4RtK0TgKKQjxVlIXQseEDCVlCJdeic0REA6MgbUzcaCFfY7gBELZGrHh8JLjkTaU3lO/PjDyxaorpfTF2kWDs8kDaKpKzEV0PVgQsE3z3Cuk9gFGRNiZuCYgbAMLWuOnRZmFjrcj7qpLA5Yuk16Kwsv2JRDK/gbT1WPCdzZgmhy3ZpwK5xmEEGB9pqxE3XJWCsIGw7SdutAncC79OTuyrrokbE7ZvFr8Cf5+X4xcJx2RIlqvjEU0RzU9TNOQQ0nsAIG3OxI2sCAhOAGED9sNmMyBrwLqrq1LOV2VD2HB99HL8jo2wdmXo6SO2cMJ9GwMkyeGTgc0PANLWmrhlIG6Twj0Imx34KtGmli8RgO8+gxMoSrT80Bx+svi1Da6P/oAkSSshC6jNUid7zTJrUcBziPQewHRIW424vTNyp2tgmCA/lxkIWyukxt5PiIITCr6+1CRrtF5vjTzowPDajjGNv8bxuPzQRn8uHLtgSJuFpTRVGKeIx+lboFOJ9B7A9EgbE7c1K/UNpmKUoMATVDpov1E+8PqwPdjQ1c63cuOj0ljLNol46aqVrHZsWbs18oCDF4QNaRB+j6f5GVTwQfgrIZZ+kujpEyb4bcka/e4Pi3EymgcUIZDeA+gNh303gEte0aZCJ6v3mJLR4Kqc2xTD4E7cmHTRhm9by5e+T1eZn8pn0N+phmVhfhft3gYRi2OFdVgRtslbV9nHi6wyl5bjF+LaIRmUWFrPud9JE7nhgAy6Uk2MnRW3DjqYrDuSN/hnAtMmbUzcni0KJXlLDYrODh1VWSr4e+gRtzUTNxrTE4dHve/gYLThzXrSGxtb1hL+2JLtNFAH96WR+zOSpazga076PGwdDGb8OVFoV+XPeV0dSsrxyzz0H+k9gN5xEFJj2DLz0cDPbaio/NdA2DwQN97k7gJu5o2Bha1CxgTHlrBdh1oGiomkjfxR3+la/S/z84qdPl/4YP5BibDVcc7PTnwdRiHWAEjbn8RtNYDNCfgTX8u5I8JWYCi8bZoP5Scu/3gVWNNoQ/tYtg2+Pi9Jm/Whpxy/0IlB0vGhuk1Cdh+HBqT3AEDa9hC3ovyEuDkBuzfss3K+EE3VHXlLyx9vzU/LVt9zT2s0QvoDZ9JGVup4ALJHxKWLtU4Rmu+YxNqSRO2DA9J7ACBtQvJGm9M7g+jSUEGkISrnKcdQdL95kmWLCLPpvjzcfY2spbCu7ZyfBwtS/RxlPZRxZH8xn3k2SbZmtWv2pEfShvQeQFA4DL2BnBZkxkEKtHiOMG29gxRZArIWxAZKc5BzUl3XKLx9IGvHs1M5rA5i0Dh9aBjTNFQftibixulgXINjtsnrH0EYJG/lu4gkLoX6X/N6FFf+AEhbS/KWlsSNTnj0QWqQ/kCn4CVyrwW3iRa8qS05jUJsfkfozVocdqr0ILQB5gguaE3aXiMaOwnKwGSOZCLiPGlpS/K2YZ2e7SNHTBJzfs+8o8M70nsAIG2OxI0UHKUGmbMyPMEUdgbaxBMEGgyGwGXb/85pKI4bfjcPrDtnAb+3aBjLh60KCJW1smuyRrKQu/SloZ/PpIvlK+bPrnx/97WDQHUYKCzlOmFZrr+nXnP3wcgsbYue18Lag2yve1wv0jUDEuyIN09PT4NtPK5MOwGuQgGgJZhcJEzWcly1AQAwWdLGxK3KOA7ypk/WUq4RCwAAAAAASBvIG8gaAAAAAACTIW0gbyBrAAAAAADSNlzyRgELqUHAwj5QLqklfNYAAAAAAKQtBAIXm5/OwOeY8meQVW3FZK3AcAAAAAAASFto5K2yvhGBm2KuN8oNtUJBdwAAAAAAaRsSgYuM3wzyIYDyQuWGM9kjIS4AAAAAgLQNncBVFrjYdJdt2xc2TNRyWNQAAAAAAKRt7CSuntmb/hxyIENF0tZM1ArMIAAAAACAtE2VxFWlUioSF5l+rlTr9SDXiPgEAAAAAJA2QEbmIiZw1ccwsatA/yax0pG1rPI3q9fOW1d/hz8aAAAAAEwb/y/AAHhWH3dxaut3AAAAAElFTkSuQmCC",
                margin: [0, 0, 0, 20],
                alignment: "center"
            },
            {
                text: "ЧЕК ПО ОПЕРАЦИИ",
                fontSize: 13,
                alignment: "center"
            },
            {
                text: "СБЕРБАНК ОНЛАЙН",
                fontSize: 13,
                margin: [0, 3, 0, 20],
                alignment: "center"
            }
        ];

        const sectionOne = [
            {
                text: "ОПЕРАЦИЯ:",
                style: "paragraph"
            },
            {
                text: "БЕЗНАЛИЧНАЯ ОПЛАТА УСЛУГ",
                style: "paragraph"
            },
            {
                text: "ДАТА ОПЕРАЦИИ (МСК):",
                style: "paragraph"
            },
            {
                text: `${date}`,
                style: "paragraph"
            },
            {
                text: "ВРЕМЯ ОПЕРАЦИИ (МСК):",
                style: "paragraph"
            },
            {
                text: `${time}`,
                style: "paragraph"
            },
            {
                text: "НОМЕР ДОКУМЕНТА:",
                style: "paragraph"
            },
            {
                text: `${documentNumber}`,
                style: "paragraph"
            },
            {
                text: "НОМЕР ОПЕРАЦИИ:",
                style: "paragraph"
            },
            {
                text: `${number}`,
                style: "paragraph"
            },
            {
                text: "СТАТУС ОПЕРАЦИИ:",
                style: "paragraph"
            },
            {
                text: "УСПЕШНО ВЫПОЛНЕН ",
                style: "paragraph"
            },
            {
                text: "СУММА ОПЕРАЦИИ:",
                style: "paragraph"
            },
            {
                text: `${price}`,
                style: "paragraph"
            },
            {
                text: "КОМИССИЯ:",
                style: "paragraph"
            },
            {
                text: "0.00 РУБ.",
                style: "paragraph"
            },
            {
                text: "ОТПРАВИТЕЛЬ:",
                style: "paragraph"
            },
            {
                text: `№ КАРТЫ: ****${cardNumber}`,
                style: "paragraph"
            },
            {
                text: "КОД АВТОРИЗАЦИИ:",
                style: "paragraph"
            },
            {
                text: `${authorizationNumber}`,
                style: "paragraph"
            },
            {
                text: "ФИО:",
                style: "paragraph"
            },
            {
                text: `${name}`,
                style: "paragraph"
            },
            {
                text: "ЛИЦЕВОЙ СЧЕТ ИЛИ НОМЕР ТЕЛЕФОНА:",
                style: "paragraph"
            },
            {
                text: `${phone}`,
                style: "paragraph"
            },
            {
                text: "УНИКАЛЬНЫЙ НОМЕР ПЛАТЕЖА(СУИП):",
                style: "paragraph"
            },
            {
                text: "800684507111WSVW",
                style: "paragraph"
            },
            {
                text: "ПОЛУЧАТЕЛЬ ПЛАТЕЖА: ",
                style: "paragraph"
            },
            {
                text: '000 "ИНТЕРСВЯЗЬ-20"',
                style: "paragraph"
            },
            {
                text: "БИК:",
                style: "paragraph"
            },
            {
                text: "047501779",
                style: "paragraph"
            },
            {
                text: "ИНН:",
                style: "paragraph"
            },
            {
                text: "7448116882",
                style: "paragraph"
            },
            {
                text: "КПП:",
                style: "paragraph"
            },
            {
                text: "744801001",
                style: "paragraph"
            },
            {
                text: "СЧЁТ:",
                style: "paragraph"
            },
            {
                text: "40702810290110000000",
                style: "paragraph"
            },
            {
                text: "КОРР. СЧЁТ:",
                style: "paragraph"
            },
            {
                text: "30101810400000000779",
                style: "paragraph"
            },
            {
                text: "НАИМЕНОВАНИЕ БАНКА ПОЛУЧАТЕЛЯ: ",
                style: "paragraph"
            },
            {
                text: 'ПАО "ЧЕЛЯБИНВЕСТБАНК"',
                style: "paragraph"
            },
            {
                width: 120,
                image:
                    "data:image/png;base64,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",
                margin: [0, 10, 0, 10],
                alignment: "center"
            },
            {
                text: "online.sberbank.ru",
                color: "#60c14e",
                alignment: "center",
                fontSize: 10
            }
        ];
        let pageSize = {
            width: 250,
            height: "auto"
        };
        let pageMargins = [30, 40, 30, 40]; // left top right bottom
        let styles = {
            pageHeaderNormal: {
                fontSize: 16,
                margin: [0, 3, 0, 10]
            },
            pageHeaderBold: {
                fontSize: 18,
                bold: true,
                margin: [0, 5, 0, 10]
            },
            header: {
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 10,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            paragraph: {
                fontSize: 10,
                margin: [0, 0, 0, 1]
            },
            paragraphBold: {
                margin: [0, 5, 0, 5],
                bold: true
            }
        };
        let defaultStyle = {
            font: "pt"
        };

        let content = [header, sectionOne];

        let pdfGen = new pdfMakeCus(
            pageSize,
            pageMargins,
            styles,
            defaultStyle
        );
        let pdfDocGenerator = await pdfGen.renderPDF(content, date, print);
        if (print) {
            pdfDocGenerator.download(date + ".pdf");
        } else {
            pdfDocGenerator.getDataUrl(dataUrl => {
                setIframeDataUrl(dataUrl);
            });
        }
    };

 
    let handleSubmit = ({ date, time, price, phone, name, authorizationNumber, cardNumber, documentNumber }) => {
        setDate(date);
        setTime(time);
        setPrice(price);
        setPhone(phone);
        setName(name);
        setCardNumber(cardNumber);
        setDocumentNumber(documentNumber);
        setNumber(getRandomInt(number + 1000, number + 1500));
        setDocumentNumber(
            getRandomInt(documentNumber + 10000, documentNumber + 15000)
        );
        setAuthorizationNumber(getRandomInt(100000, 900000));
        renderPDF({
            date,
            time : `${getRandomInt(10, 22)}:${getRandomInt(10, 59)}:${getRandomInt(
                10,
                59
            )}`,
            price,
            phone,
            name,
            authorizationNumber,
            cardNumber,
            documentNumber
        });
        setTime(
            `${getRandomInt(8, 22)}:${getRandomInt(1, 59)}:${getRandomInt(
                1,
                59
            )}`
        );
        console.log(
            `${getRandomInt(10, 22)}:${getRandomInt(10, 59)}:${getRandomInt(
                10,
                59
            )}`
        );
        
    };
    return (
        <div style={{ height: "100vh" }}>
            <Row>
                <Col span={18} push={6} style={{ height: "100vh" }}>
                    {iframeDataUrl && (
                        <iframe
                            title={date}
                            width="100%"
                            height="100%"
                            type="application/pdf"
                            src={iframeDataUrl}
                        ></iframe>
                    )}
                </Col>
                <Col
                    span={6}
                    pull={18}
                    style={{
                        padding: "20px 10px",
                        height: "100vh",
                        overflowY: "scroll"
                    }}
                >
                    {/* <Avatar/> */}
                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            form.validateFields((err, values) => {
                                if (!err) {
                                    handleSubmit(values);
                                }
                            });
                        }}
                    >
                        <Form.Item label="Ngày">
                            {form.getFieldDecorator("date", {
                                initialValue: date,
                                rules: [
                                    {
                                        type: "string",
                                        required: true,
                                        message: "Vui lòng chọn ngày"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            {form.getFieldDecorator("time", {
                                initialValue: time,
                                rules: [
                                    {
                                        type: "string",
                                        required: true,
                                        message: "Vui lòng chọn thời gian"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Giá">
                            {form.getFieldDecorator("price", {
                                initialValue: price,
                                rules: [
                                    {
                                        type: "string",
                                        required: true,
                                        message: "Vui lòng chọn giá"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => (
                                <ChevronRight rotate={isActive ? 90 : 0} />
                            )}
                            style={{ marginBottom: "10px" }}
                            className="site-collapse-custom-collapse"
                        >
                            <Panel
                                header="Tham số"
                                key="1"
                                className="site-collapse-custom-panel"
                            >
                                <Form.Item label="Số">
                                    {form.getFieldDecorator("number", {
                                        initialValue: number
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Document number">
                                    {form.getFieldDecorator("documentNumber", {
                                        initialValue: documentNumber
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Tên">
                                    {form.getFieldDecorator("name", {
                                        initialValue: name
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Số thẻ">
                                    {form.getFieldDecorator("cardNumber", {
                                        initialValue: cardNumber
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Xác thực">
                                    {form.getFieldDecorator(
                                        "authorizationNumber",
                                        {
                                            initialValue: authorizationNumber
                                        }
                                    )(<Input />)}
                                </Form.Item>
                                <Form.Item label="Số điện thoại">
                                    {form.getFieldDecorator("phone", {
                                        initialValue: phone,
                                        rules: [
                                            {
                                                type: "string",
                                                required: true,
                                                message: "Vui lòng chọn sdt"
                                            }
                                        ]
                                    })(<Input />)}
                                </Form.Item>
                            </Panel>
                        </Collapse>
                        <Button icon="search" type="primary" htmlType="submit">
                            Tạo hóa đơn
                        </Button>
                        <Checkbox
                            style={{ margin: "0px 10px" }}
                            checked={print}
                            onChange={() => setPrint(!print)}
                        >
                            Print
                        </Checkbox>
                        <p>
                            * Lưu ý: Chọn chế độ print sẽ hiện thị kết quả xem
                            trước
                        </p>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Form.create()(InternetSberbankInvoice);
