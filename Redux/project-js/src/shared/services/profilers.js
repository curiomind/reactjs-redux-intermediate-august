export function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) {
  console.log('React Profiles', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}
