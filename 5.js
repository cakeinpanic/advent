let input = [0, 0, 0, 1, 2, -1, 0, -5, -6, -5, -3, -3, -8, -3, -7, -8, -4, -9, 1, -3, -17, 0, -18, -14, 1, -13, -4, -22, -7, -8, -25, -23, -11, -3, -9, -3, -26, -7, -24, -15, -17, 2, -18, -39, -6, -28, -27, -38, -47, -17, -16, -36, -34, -3, -40, -11, -45, -11, -34, 2, -27, -38, -7, -48, -14, -35, -37, -31, -42, -8, 0, -39, -20, -50, -9, -7, -18, -6, -65, -44, -68, -67, -61, -19, -3, 0, -66, -63, -29, -4, -29, -77, -51, -72, -91, -84, -38, -93, 0, -7, -15, -78, -68, -59, -68, -47, -60, -101, -30, -69, -4, -52, -4, -60, -30, -65, -44, -108, -70, -43, -80, -102, -25, -58, -60, -13, -81, -17, -51, -32, -93, -38, -2, -16, -8, -1, -94, -55, -122, -77, -75, -25, -30, -55, -60, -23, -49, 0, -119, -90, -129, -35, -8, -18, -79, -65, -16, -100, -143, -148, -39, -106, -140, -102, -126, -36, -41, -20, -23, -140, -138, -112, -49, -60, -7, -152, -162, -142, -1, -38, -15, -4, -7, -65, 0, -114, -150, -160, -162, -29, -164, -32, -60, -60, -97, -130, -97, -172, -25, -185, -35, -77, -138, -188, -182, -137, -122, -133, -6, -37, -199, -108, -53, -188, -60, -30, -160, -160, -23, -176, -10, -23, -6, -116, -216, -155, -107, -66, -55, -107, -132, -91, -152, -127, -142, -90, -54, -40, -86, -151, -123, -120, -37, -84, -86, -205, -117, -179, -32, -26, -228, -232, -116, -67, -122, -125, -61, -2, 2, -216, -63, -31, -147, -84, -113, -122, -39, -5, -47, -200, -129, -224, -246, -8, -112, -140, -65, -259, -110, -164, -85, -97, -129, -90, -124, -6, -228, -143, -78, -166, -150, -165, -262, -178, -6, -44, -44, 2, -57, -43, -116, -197, -93, -221, -160, -96, -121, -127, -162, -181, -45, -40, -139, -194, -311, -291, -104, -217, -103, -28, -207, -21, -97, -91, -224, -257, -278, -176, -8, -93, -103, -35, -33, -320, -70, -254, -115, -59, -171, -45, -143, -250, -187, -181, -146, -210, -66, -297, -188, -79, -78, -309, -186, -272, -62, -41, -274, -323, -174, -344, -45, -146, -110, -283, -135, -24, -262, -39, -41, -112, -190, -214, -314, -224, -338, -167, -240, -95, -231, -154, -281, -52, -282, -274, -332, -311, -9, -159, -191, -80, -299, -354, -250, -232, -98, -132, -72, -61, -318, -255, -194, -282, -289, -114, -131, -267, -276, -65, -238, -335, -124, -7, -339, -295, -111, -260, -76, -82, -206, -383, -251, -230, -139, -109, -273, -222, -302, -359, -23, -326, -283, -75, -186, -270, -38, -208, -127, -63, -265, -215, -308, -350, -175, -358, -2, -166, -343, -421, -253, -34, -177, -426, -173, -127, -108, -93, -412, -102, -216, -35, -254, -85, -238, -401, -268, -212, -393, -332, -30, -374, -301, -39, -449, -59, -453, -63, -301, -251, -396, -78, -79, -279, -171, -471, -236, -56, -101, -129, -50, 2, -213, -127, -107, -90, -472, -473, -435, -17, -490, -354, -122, -65, -181, -303, -319, -133, -350, -380, -60, -200, -55, -44, -482, -501, -82, -51, -361, -167, -7, -493, -68, -488, -18, -487, -250, -179, -143, -307, -85, -494, -178, -477, -453, -519, -143, -104, -523, -282, -16, -497, -358, -209, -292, -337, -500, -255, -167, -527, -184, -451, -305, -277, -453, -296, -441, -410, -521, -431, -215, -23, -53, -88, -296, -28, -454, -285, -259, -513, -526, -164, -4, -90, -22, -274, -432, -487, -372, -130, -162, -317, -401, -390, -16, -162, -409, -509, -256, -274, -371, -331, -430, -10, -562, -516, -246, -399, -122, -328, -134, -211, -443, -321, -290, -579, -101, -48, -208, -503, -138, -43, -33, -278, -8, -278, -515, -111, -164, -503, -69, -538, -450, -290, -434, -194, -477, -284, -324, -292, -582, -267, -38, -217, -489, -102, -142, -50, -511, -606, -254, -404, -319, -261, -191, -26, -376, -13, -355, -483, -133, -573, -136, -508, -70, -249, -86, -353, -280, -418, -582, -371, -652, -643, -369, -522, -33, -456, -226, -600, -621, -394, -516, -52, -542, -548, -524, -4, -202, -102, -405, -203, -101, -76, -160, -30, -314, -45, -211, -223, -35, -672, -640, -576, -198, -131, -478, -334, -44, -489, -351, -180, -242, -473, -462, -519, -651, -608, -360, -626, -262, -403, -50, -535, -284, -387, -227, -523, -152, -454, -687, -331, -201, -246, -533, -667, -71, -34, -24, -190, -227, -528, -413, -302, -687, -719, -714, -466, -432, -460, -83, -703, -401, -642, -146, -350, -128, -549, -579, -83, -747, -219, -612, -410, -694, -643, -268, -323, -684, -677, -290, -6, -78, -627, -751, -360, -76, -249, -724, -154, -106, -290, -669, -51, -290, -634, -740, -605, -645, -713, -214, -767, -752, -689, -174, -487, -386, -561, -394, -605, -4, -7, -180, -781, -75, -462, -471, -723, -709, -30, -434, -771, -652, -8, -796, -748, -87, -463, -276, -436, -477, -116, -86, -600, -476, -499, -173, -219, -85, -458, -225, -144, -405, -688, -570, -45, -65, -741, -184, -504, -265, -336, -130, -361, -95, -528, -532, -186, -461, -189, -682, -306, -223, -75, -11, -640, -313, -539, -548, -594, -203, -605, -277, -356, -822, -242, -282, -219, -441, -72, -558, -832, -322, -572, -44, -660, -736, -754, -99, -192, -482, -248, -296, -799, -418, -759, -114, -507, -10, -717, -778, -279, -775, -787, -864, -554, -525, -632, -312, -183, -267, -735, -342, -453, -152, -882, -95, -538, -227, -336, -719, -254, -481, -481, -591, -739, -783, -409, -468, -328, -429, -271, -425, -246, -476, -822, -757, -771, -2, -41, -676, -821, -288, -386, -749, -528, -777, -916, -312, -648, -699, -26, -258, -722, -513, -706, -111, -631, -745, -148, -710, -147, -470, -312, -314, -448, -530, -674, -283, -657, -404, -483, -712, -278, -154, -841, -152, -506, -537, -226, -649, -711, -808, -331, -196, -877, -432, -847, -745, -669, -71, -692, -175, -438, -83, -826, -64, -611, -528, -553, -664, -754, -678, -503, -362, -365, -710, -339, -805, -47, -298, -274, -551, -901, -581, -562, -368, -6, -559, -964, -994, -404, -148, -383, -154, -518, -350, -309, -669, -689, -780, -457, -88, -142, -522, -177, -115, -935, -893, -306, -481, -912, -745, -691, -763, -674, -246, -994, -497, -686, -474, -661, -385, -9, -310, -710, -991, -51, -361, -314, -346, -355, -872, -622, -998, -586, -631, -1023, -798, -789, -55, -166, -658, -818, -850, -590, -1035, -274, -524, -913, -183, -383, -297, -378, -186, -858, -369, -191, -815, -648, -367, -460, -879, -1052, -476, -382, -455, -892, -57, -54, -523, -824, -1030, -675, -980, -818, -629, -201, -939, -586, -913, -858];

function fifth(input) {
    let currentPosition = 0;
    let stepsCount = 0;

    function makeStep(index) {
        currentPosition += input[index]++;
        stepsCount++;
    }

    while (currentPosition > -1 && currentPosition < input.length) {
        makeStep(currentPosition);
    }
    return stepsCount;
}

console.log(fifth(input))