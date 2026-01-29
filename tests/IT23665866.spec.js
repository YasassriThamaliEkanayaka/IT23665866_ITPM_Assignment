// @ts-check
import { test, expect } from '@playwright/test';

/**
 * 1. SELECTORS
 * Targeted based on the current SwiftTranslator UI structure.
 */
const INPUT_SELECTOR = 'textarea[placeholder*="Input Your Singlish"]';
const OUTPUT_SELECTOR = 'div.w-full.h-80.p-3.rounded-lg';

/**
 * 2. TEST CASES 
 * Compiled from Excel Scenarios 
 */
const testCases = [
  // --- POSITIVE FUNCTIONAL TESTS (24 Scenarios) ---
  { id: 'Pos_Fun_0001', name: 'Simple daily task', input: 'ammaa kiribath uyanavaa', expected: 'අම්මා කිරිබත් උයනවා.' },
  { id: 'Pos_Fun_0002', name: 'Greetings & line breaks', input: 'aayuboovan! \npaevarum sampuurNa kaLaadha Lamayi?', expected: 'ආයුබෝවන්! \nපැවරුම් සම්පූර්ණ කළාද ළමයි?' },
  { id: 'Pos_Fun_0003', name: 'Informal repeated words', input: 'oya ballata kanna tikak dhiyan, naeththam ookaa badaginnee maeri maeri idhiivi.', expected: 'ඔය බල්ලට කන්න ටිකක් දියන්, නැත්තම් ඕකා බඩගින්නේ මැරි මැරි ඉදීවි.' },
  { id: 'Pos_Fun_0004', name: 'Formal request conditional', input: 'oyaata puLuvannam karuNaakara eyaava meheta evanna.', expected: 'ඔයාට පුළුවන්නම් කරුණාකර එයාව මෙහෙට එවන්න.' },
  { id: 'Pos_Fun_0005', name: 'Complex daily reason', input: 'mata kammaeLi ,mama iiyeth paadam karee naee .eevuNaata adha karanna ooni mokadha exam pebaravaari 1 start karanavaa kivvaa.', expected: 'මට කම්මැළි ,මම ඊයෙත් පාඩම් කරේ නෑ .ඒවුණාට අද කරන්න ඕනි මොකද exam පෙබරවාරි 1 start කරනවා කිව්වා.' },
  { id: 'Pos_Fun_0006', name: 'Formal long paragraph', input: 'Heevaahaeta kaNiShTa vidhYaalayee sisun paaniiya jala gaetaluvakata muhuNapaa sitina baevin shrii lQQkaa thorathuru thaakShaNa aayathanaya visin ema gaetaluva niraakaraNaya kiriima udhesaa Rs. 100 000 ka mudhalak parithYaaga kiriimata thiiraNaya kara aetha.', expected: 'හේවාහැට කණිෂ්ඨ විද්‍යාලයේ සිසුන් පානීය ජල ගැටලුවකට මුහුණපා සිටින බැවින් ශ්‍රී ලංකා තොරතුරු තාක්ෂණ ආයතනය විසින් එම ගැටලුව නිරාකරණය කිරීම උදෙසා Rs. 100 000 ක මුදලක් පරිත්‍යාග කිරීමට තීරණය කර ඇත.' },
  { id: 'Pos_Fun_0007', name: 'Respectful formal sentence', input: 'svaamiinvahanseelaa dhaanaya anuBhava kiriimen anathuruva oba aahaara anuBhava karanna.', expected: 'ස්වාමීන්වහන්සේලා දානය අනුභව කිරීමෙන් අනතුරුව ඔබ ආහාර අනුභව කරන්න.' },
  { id: 'Pos_Fun_0008', name: 'Imperative formal event', input: 'badhu nogevuu siyaluuma dhenaa heta dhinayeedhii raaja saBhaavata raesvenu!', expected: 'බදු නොගෙවූ සියලූම දෙනා හෙට දිනයේදී රාජ සභාවට රැස්වෙනු!' },
  { id: 'Pos_Fun_0009', name: 'Polite complex request', input: 'samaavenna, oyaata karadharayak naethinam mata vathura tikak dහenna puLuvandha?', expected: 'සමාවෙන්න, ඔයාට කරදරයක් නැතිනම් මට වතුර ටිකක් දෙන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_0010', name: 'Informal slang mixed', input: 'Adoo ara assignment ekee deadline adha bQQ. ikmanata karamu.', expected: 'අඩෝ අර assignment එකේ deadline අද බං. ඉක්මනට කරමු.' },
  { id: 'Pos_Fun_0011', name: 'Scheduling & time', input: 'dhosthara mahaththayaa ennee 7.00 PM ta. magee number eka 02 nisaa veelaasanin yanna oonee.', expected: 'දොස්තර මහත්තයා එන්නේ 7.00 PM ට. මගේ number එක 02 නිසා වේලාසනින් යන්න ඕනේ.' },
  { id: 'Pos_Fun_0012', name: 'Common English words', input: 'dhaen kalin vage online lectures naethi nisaa udheema campus ekata emu.', expected: 'දැන් කලින් වගෙ online lectures නැති නිසා උදේම campus එකට එමු.' },
  { id: 'Pos_Fun_0013', name: 'Multiple spaces & units', input: 'gedhara   enakota  haal 1kg k aran     enna.', expected: 'ගෙදර   එනකොට  හාල් 1kg ක් අරන්     එන්න.' },
  { id: 'Pos_Fun_0014', name: 'Response type sentence', input: 'ov, mama eeka piligannavaa.\nehenam api heta udhaeesana zoom meeting ekeedhi thiiraNa gaena aaye kathaa karamu.', expected: 'ඔව්, මම ඒක පිලිගන්නවා.\nඑහෙනම් අපි හෙට උදෑසන zoom meeting එකේදි තීරණ ගැන ආයෙ කතා කරමු.' },
  { id: 'Pos_Fun_0015', name: 'Frequent collocation', input: 'kaeema kanna kalin atha hodhanna oonee.', expected: 'කෑම කන්න කලින් අත හොදන්න ඕනේ.' },
  { id: 'Pos_Fun_0016', name: 'Date format appointment', input: 'ov, mama eeka piLigannavaa.\napi 2026/01/30 venidhaata meeting eka thiyamudha? ethakam oyaa paraNa reports tika check karanna balanna.', expected: 'ඔව්, මම ඒක පිළිගන්නවා.\nඅපි 2026/01/30 වෙනිදාට meeting එක තියමුද? එතකම් ඔයා පරණ reports ටික check කරන්න බලන්න.' },
  { id: 'Pos_Fun_0017', name: 'Segmented travel plan', input: 'mama heta nuvara pitath venavaa.', expected: 'මම හෙට නුවර පිටත් වෙනවා.' },
  { id: 'Pos_Fun_0018', name: 'Present continuous activity', input: 'mama dhaen pothak kiyavanna hadhannee.', expected: 'මම දැන් පොතක් කියවන්න හදන්නේ.' },
  { id: 'Pos_Fun_0019', name: 'Compound negation', input: 'mata adha eeka karanna baee , mama eeka gaena dhannee naeenee.', expected: 'මට අද ඒක කරන්න බෑ , මම ඒක ගැන දන්නේ නෑනේ.' },
  { id: 'Pos_Fun_0020', name: 'Singular third person', input: 'eyaa adha kaeema genna amathaka kaLaa.', expected: 'එයා අද කෑම ගෙන්න අමතක කළා.' },
  { id: 'Pos_Fun_0021', name: 'Plural future project', input: 'dharuvangee saakSharathaavaya dhiyuNu kiriimata api iiLaGa maasayeedhii aluth vaeda piLiveLak patangamu.', expected: 'දරුවන්ගේ සාක්ෂරතාවය දියුණු කිරීමට අපි ඊළඟ මාසයේදී අලුත් වැඩ පිළිවෙළක් පටන්ගමු.' },
  { id: 'Pos_Fun_0022', name: 'Technical abbreviations', input: 'oyaagee NIC eka saha PIN eka dhiilaa mee aluth App ekata login venna.\ninpasu oyaata OTP ekak SMS ekakin laebeevi.', expected: 'ඔයාගේ NIC එක සහ PIN එක දීලා මේ අලුත් App එකට login වෙන්න.\nඉන්පසු ඔයාට OTP එකක් SMS එකකින් ලැබේවි.' },
  { id: 'Pos_Fun_0023', name: 'Reduplication rhythm', input: 'api dhura yana nisaa parissamin hemin hemin yamu. vaessa nisaa vathura piri piri thiyennee, eeka nisaa saelakillen vaahanee drive karanna.', expected: 'අපි දුර යන නිසා පරිස්සමින් හෙමින් හෙමින් යමු. වැස්ස නිසා වතුර පිරි පිරි තියෙන්නේ, ඒක නිසා සැලකිල්ලෙන් වාහනේ drive කරන්න.' },
  { id: 'Pos_Fun_0024', name: 'Punctuation & brackets', input: 'suba udhaeesanak!\n(Good Morning!) oyaata udhavvak karanna puLuvandha?', expected: 'සුබ උදෑසනක්!\n(Good Morning!) ඔයාට උදව්වක් කරන්න පුළුවන්ද?' },

  // --- NEGATIVE FUNCTIONAL TESTS (10 Scenarios) ---
  { id: 'Neg_Fun_0025', name: 'Joined script failure', input: 'vaahaneeReadydha?dhaenmamayannahadhannee.', expected: 'වාහනේRඑඅඩ්ය්ද?දැන්මමයන්නහදන්නේ.' },
  { id: 'Neg_Fun_0026', name: 'Large paragraph technical mangling', input: 'oyaagee LinkedIn profile eka update karanna ooneanam...', expected: '...cව් එකක් හදාගෙන ඉන්න.' }, // Simplified for brevity; use full string from Excel
  { id: 'Neg_Fun_0027', name: 'Place name Title failure', input: 'Dean sar adha zoom meeting ekak gannava maalabee transfer venna inna ayata.', expected: 'Dean සර් අද zoom meeting එකක් ගන්නව මාලබේ transfer වෙන්න ඉන්න අයට.' },
  { id: 'Neg_Fun_0028', name: 'URL phoneticization', input: 'mamath kiyevve www.news.lk ekee.', expected: 'මමත් කියෙව්වෙ www.news.ල්ක් එකේ.' },
  { id: 'Neg_Fun_0029', name: 'Mixed Case iPhone failure', input: 'magee aluth iPhone eka niyamayi.', expected: 'මගේ අලුත් ඉඵ්හොනෙ එක නියමයි.' },
  { id: 'Neg_Fun_0030', name: 'MacBook CamelCase failure', input: 'mee magee aluth MacBook eka.', expected: 'මේ මගේ අලුත් මcඹෝක් එක.' },
  { id: 'Neg_Fun_0031', name: 'Proper noun cluster failure', input: 'mage nama Yasassri', expected: 'මගේ නම Yඅසස්ස්‍රි.' },
  { id: 'Neg_Fun_0032', name: 'eBay brand mangling', input: 'mama adha eBay eken badu gaththaa.', expected: 'මම අද එඹය් එකෙන් බඩු ගත්තා.' },
  { id: 'Neg_Fun_0033', name: 'JavaScript technical scramble', input: 'JavaScript code eka copy karanna.', expected: 'ඦවසcරිප්ට් code එක copy කරන්න.' },
  { id: 'Neg_Fun_0034', name: 'Reduplication collapse', input: 'hari hari lassanayi lassanayi .', expected: 'හරිහරි ලස්සනයිලස්සනයි' }
];

test.describe('Assignment 1 Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate and wait for stable state [cite: 13]
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const data of testCases) {
    test(`[${data.id}] ${data.name}`, async ({ page }) => {
      const inputField = page.locator(INPUT_SELECTOR);
      const outputElement = page.locator(OUTPUT_SELECTOR);
      
      // 1. Clear existing text
      await inputField.click();
      await inputField.clear();

      // 2. Sequential typing ensures real-time triggers 
      await inputField.pressSequentially(data.input, { delay: 20 });
      
      // 3. Trigger conversion explicitly via Enter
      await page.keyboard.press('Enter');

      // 4. Wait for output box to resolve from empty state
      await expect(outputElement).not.toBeEmpty({ timeout: 10000 });

      // 5. Final validation against Expected Output recorded in Excel [cite: 331]
      // Using a partial match or contains if needed, or exact text.
      await expect(outputElement).toContainText(data.expected);

      console.log(`\n--- TEST PASSED: ${data.id} ---`);
    });
  }
});

/**
 * 3. UI REAL-TIME UPDATE TEST [cite: 66]
 */
test('Pos_UI_0001: Real-time update check', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const input = page.locator(INPUT_SELECTOR);
  const output = page.locator(OUTPUT_SELECTOR);
  
  await input.click();
  // Typing 'man' triggers real-time conversion to 'මන්' [cite: 418]
  await page.keyboard.type('man');
  await page.keyboard.press('Space');

  // Verify real-time behavior 
  await expect(output).toContainText('මන්', { timeout: 7000 });
  
  console.log('UI Test Passed: Output updated in real-time');
});




// --- Case 35: Negative UI Test for line break preservation failure ---
test('Neg_UI_0035: UI not preserving line breaks during live input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  const input = page.locator(INPUT_SELECTOR);
  const output = page.locator(OUTPUT_SELECTOR);

  // Simulating multi-line input to test formatting preservation
  const multilineInput = "line one\nline two";
  
  await input.click();
  await input.pressSequentially(multilineInput, { delay: 30 });
  
  const actualText = await output.innerText();
  
  // As observed in Excel, system fails to keep the break in real-time UI
  expect(actualText).not.toContain('\n'); 
  
  console.log('Neg_UI_0035 Passed: Confirmed UI failure in line break preservation.');
});