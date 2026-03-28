import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getLesson } from '../../lib/lessonData';
import { checkChallengesAfterProgress, markLessonComplete } from '../../lib/progress';

const EMOJI_COLORS: Record<string, string> = {
  '🫙':'#D4EDDA','♻️':'#D4EDDA','✅':'#D4EDDA','❌':'#FDECEA','💡':'#FFF9C4',
  '🪛':'#E8F4FD','🔩':'#E8F4FD','🔵':'#E8F4FD','🔥':'#FDECEA','💧':'#E8F4FD',
  '🚿':'#E8F4FD','⚡':'#FFF9C4','🌍':'#D4EDDA','🥫':'#FFF9C4','🧲':'#E8F4FD',
  '🥤':'#E8F4FD','🧴':'#E8F4FD','⚠️':'#FDECEA','🚫':'#FDECEA','🛍️':'#F3E5F5',
  '📄':'#E8F4FD','🗞️':'#F3E5F5','✉️':'#E8F4FD','🍕':'#FFF9C4','📦':'#FFF9C4',
  '🧃':'#D4EDDA','🗂️':'#E8F4FD','☕':'#FFF9C4','🥦':'#D4EDDA','🍲':'#FFF9C4',
  '🌡️':'#FDECEA','🌱':'#D4EDDA','🌻':'#FFF9C4','🛒':'#F3E5F5','🫕':'#FFF9C4',
  '🔍':'#E8F4FD','🧪':'#E8F4FD','📊':'#E8F4FD','🐚':'#E8F4FD','🌸':'#F3E5F5',
  '🧻':'#F3E5F5','🍔':'#FFF9C4','☀️':'#FFF9C4','🔎':'#E8F4FD','1️⃣':'#E8F4FD',
  '2️⃣':'#E8F4FD','3️⃣':'#FDECEA','6️⃣':'#FDECEA','7️⃣':'#FDECEA','🔬':'#E8F4FD',
  '🏪':'#FFF9C4','📱':'#E8F4FD','🧹':'#E8F4FD','🌽':'#FFF9C4','🧅':'#FFF9C4',
  '🥩':'#FDECEA','?':'#D4EDDA','🍞':'#FFF9C4','roll':'#F3E5F5','🛍':'#F3E5F5',
};

function cardColor(emoji: string) {
  return EMOJI_COLORS[emoji] ?? '#E8F0DC';
}

export default function LessonPlayer() {
  const { id, returnTo } = useLocalSearchParams<{ id: string; returnTo?: string }>();
  const lesson = getLesson(id ?? '');

  // ── ALL hooks BEFORE any conditional returns ──────────────────────────────
  const [slideIndex, setSlideIndex]       = useState(0);
  const [finished, setFinished]           = useState(false);
  const [alreadyDone, setAlreadyDone]     = useState(false);
  const [ptsEarned, setPtsEarned]         = useState(0);
  const [saving, setSaving]               = useState(false);
  const [newChallenges, setNewChallenges] = useState<string[]>([]);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardAnim     = useRef(new Animated.Value(1)).current;
  const rewardAnim   = useRef(new Animated.Value(0)).current;
  const rewardScale  = useRef(new Animated.Value(0.6)).current;

  const total  = lesson?.slides.length ?? 1;
  const slide  = lesson?.slides[slideIndex];
  const isLast = slideIndex === total - 1;

  // Progress bar animation — safe because hooks run before any return
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (slideIndex + 1) / total,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [slideIndex, total]);

  // ── Now safe to do conditional renders ────────────────────────────────────
  if (!lesson || !slide) {
    return (
      <View style={styles.center}>
        <StatusBar style="dark" />
        <Text style={styles.errorText}>Lesson not found.</Text>
        <TouchableOpacity style={styles.backLinkBtn} onPress={() => router.back()}>
          <Text style={styles.backLinkText}>← Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function animateCard(cb: () => void) {
    Animated.sequence([
      Animated.timing(cardAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(cardAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    setTimeout(cb, 120);
  }

  function goNext() {
    if (slideIndex < total - 1) animateCard(() => setSlideIndex(i => i + 1));
  }
  function goPrev() {
    if (slideIndex > 0) animateCard(() => setSlideIndex(i => i - 1));
  }

  async function handleFinish() {
    setSaving(true);
    try {
      const { pointsEarned, alreadyDone: done } = await markLessonComplete(id!);
      const newC = await checkChallengesAfterProgress();
      setPtsEarned(pointsEarned);
      setAlreadyDone(done);
      setNewChallenges(newC);
    } catch (e) {
      console.error('markLessonComplete error:', e);
    }
    setFinished(true);
    setSaving(false);
    Animated.parallel([
      Animated.spring(rewardAnim,  { toValue: 1, useNativeDriver: true }),
      Animated.spring(rewardScale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  }

  function handleBack() {
    const decoded = returnTo ? decodeURIComponent(returnTo) : null;
    if (decoded) {
      router.push(decoded as any);
    } else {
      router.back();
    }
  }

  // ── COMPLETION SCREEN ─────────────────────────────────────────────────────
  if (finished) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.completionBg}>
          <Animated.View style={[styles.completionCard, {
            opacity: rewardAnim,
            transform: [{ scale: rewardScale }],
          }]}>
            <Text style={styles.completionEmoji}>🎉</Text>
            <Text style={styles.completionTitle}>Lesson Complete!</Text>
            <Text style={styles.completionSub}>{lesson.partTitle}</Text>

            {alreadyDone ? (
              <View style={styles.alreadyBadge}>
                <Feather name="check-circle" size={18} color="#606C38" />
                <Text style={styles.alreadyText}>Already completed — no extra points</Text>
              </View>
            ) : (
              <View style={styles.ptsBox}>
                <Text style={styles.ptsLabel}>Points Earned</Text>
                <Text style={styles.ptsValue}>+{ptsEarned} pts</Text>
              </View>
            )}

            {newChallenges.length > 0 && (
              <View style={styles.challengeBanner}>
                <Feather name="zap" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.challengeBannerText}>🏆 Challenge milestone unlocked!</Text>
              </View>
            )}

            <View style={styles.completionActions}>
              <TouchableOpacity style={styles.btnSecondary} onPress={handleBack}>
                <Text style={styles.btnSecondaryText}>Back to Chapter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={() => {
                  const rtParam = returnTo ? encodeURIComponent(decodeURIComponent(returnTo)) : '';
                  router.push(`/(tabs)/QuizPlayer?id=${id}&returnTo=${rtParam}` as any);
                }}
              >
                <Text style={styles.btnPrimaryText}>Take Quiz →</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }

  // ── LESSON SLIDE SCREEN ───────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerChapter} numberOfLines={1}>{lesson.chapterTitle}</Text>
          <Text style={styles.headerPart} numberOfLines={1}>{lesson.partTitle}</Text>
        </View>
        <View style={{ width: 38 }} />
      </View>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, {
          width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
        }]} />
      </View>
      <Text style={styles.progressLabel}>{slideIndex + 1} / {total}</Text>

      <ScrollView contentContainerStyle={styles.slideContainer} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.slideCard, {
          backgroundColor: cardColor(slide.emoji),
          opacity: cardAnim,
          transform: [{ scale: cardAnim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }],
        }]}>
          <Text style={styles.slideEmoji}>{slide.emoji}</Text>
          <Text style={styles.slideTitle}>{slide.title}</Text>
          <Text style={styles.slideBody}>{slide.body}</Text>
          {slide.tip && (
            <View style={styles.tipBox}>
              <Feather name="zap" size={14} color="#606C38" style={{ marginRight: 6 }} />
              <Text style={styles.tipText}>{slide.tip}</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navBtn, slideIndex === 0 && styles.navBtnDisabled]}
          onPress={goPrev}
          disabled={slideIndex === 0}
        >
          <Feather name="chevron-left" size={22} color={slideIndex === 0 ? '#ccc' : '#FEFAE0'} />
          <Text style={[styles.navBtnText, slideIndex === 0 && styles.navBtnTextDisabled]}>Back</Text>
        </TouchableOpacity>

        {isLast ? (
          <TouchableOpacity style={styles.finishBtn} onPress={handleFinish} disabled={saving}>
            <Text style={styles.finishBtnText}>{saving ? 'Saving…' : '✅ Complete Lesson'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
            <Text style={styles.nextBtnText}>Next</Text>
            <Feather name="chevron-right" size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: '#283618' },
  center:              { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText:           { fontSize: 18, color: '#333', marginBottom: 16, fontWeight: '600' },
  backLinkBtn:         { backgroundColor: '#606C38', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  backLinkText:        { color: '#fff', fontWeight: '700', fontSize: 15 },
  header:              { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 8 },
  backBtn:             { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerCenter:        { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  headerChapter:       { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  headerPart:          { fontSize: 16, color: '#fff', fontWeight: '700', marginTop: 2 },
  progressTrack:       { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 20, borderRadius: 3, marginTop: 12 },
  progressFill:        { height: 6, backgroundColor: '#FEFAE0', borderRadius: 3 },
  progressLabel:       { textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 6, marginBottom: 4 },
  slideContainer:      { padding: 20, paddingBottom: 40 },
  slideCard:           { borderRadius: 24, padding: 28, minHeight: 360, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 16, elevation: 4 },
  slideEmoji:          { fontSize: 64, textAlign: 'center', marginBottom: 20 },
  slideTitle:          { fontSize: 21, fontWeight: '800', color: '#1A1A1A', textAlign: 'center', marginBottom: 16, lineHeight: 29 },
  slideBody:           { fontSize: 15, color: '#333', lineHeight: 25, textAlign: 'center' },
  tipBox:              { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(96,108,56,0.12)', borderRadius: 12, padding: 12, marginTop: 20 },
  tipText:             { flex: 1, fontSize: 13, color: '#606C38', fontWeight: '600', lineHeight: 19 },
  navRow:              { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 34, paddingTop: 8, backgroundColor: '#283618' },
  navBtn:              { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)' },
  navBtnDisabled:      { opacity: 0.3 },
  navBtnText:          { fontSize: 15, color: '#FEFAE0', fontWeight: '600', marginLeft: 4 },
  navBtnTextDisabled:  { color: '#ccc' },
  nextBtn:             { flexDirection: 'row', alignItems: 'center', backgroundColor: '#606C38', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14 },
  nextBtnText:         { fontSize: 16, color: '#fff', fontWeight: '700', marginRight: 6 },
  finishBtn:           { backgroundColor: '#FEFAE0', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 14 },
  finishBtnText:       { fontSize: 15, color: '#283618', fontWeight: '800' },
  completionBg:        { flex: 1, backgroundColor: '#283618', justifyContent: 'center', alignItems: 'center', padding: 24 },
  completionCard:      { backgroundColor: '#fff', borderRadius: 28, padding: 32, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 8 },
  completionEmoji:     { fontSize: 72, marginBottom: 12 },
  completionTitle:     { fontSize: 26, fontWeight: '800', color: '#1A1A1A', marginBottom: 6 },
  completionSub:       { fontSize: 15, color: '#777', marginBottom: 24, textAlign: 'center' },
  alreadyBadge:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F0DC', borderRadius: 12, padding: 12, marginBottom: 20, gap: 8 },
  alreadyText:         { fontSize: 13, color: '#606C38', fontWeight: '600' },
  ptsBox:              { backgroundColor: '#E8F0DC', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center', marginBottom: 20 },
  ptsLabel:            { fontSize: 13, color: '#606C38', fontWeight: '600', marginBottom: 4 },
  ptsValue:            { fontSize: 32, fontWeight: '900', color: '#283618' },
  challengeBanner:     { flexDirection: 'row', alignItems: 'center', backgroundColor: '#606C38', borderRadius: 12, padding: 12, marginBottom: 20, width: '100%', justifyContent: 'center' },
  challengeBannerText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  completionActions:   { flexDirection: 'row', gap: 10, width: '100%' },
  btnSecondary:        { flex: 1, borderWidth: 2, borderColor: '#606C38', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  btnSecondaryText:    { color: '#606C38', fontWeight: '700', fontSize: 14 },
  btnPrimary:          { flex: 1, backgroundColor: '#606C38', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  btnPrimaryText:      { color: '#fff', fontWeight: '700', fontSize: 14 },
});