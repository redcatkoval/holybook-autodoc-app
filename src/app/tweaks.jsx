function Tweaks() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Apply tweaks to the document by toggling CSS classes on body.
  useEffect(() => {
    document.body.dataset.curtainPos = tweaks.curtainPos;
    document.body.dataset.navStyle = tweaks.navStyle;
    document.body.dataset.garageStyle = tweaks.garageStyle;
  }, [tweaks]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Curtain &amp; nav" />
      <TweakRadio
        label="Curtain default position"
        value={String(tweaks.curtainPos)}
        onChange={v => setTweak("curtainPos", parseFloat(v))}
        options={["0", "0.5", "1"]}
      />
      <TweakRadio
        label="Bottom nav style"
        value={tweaks.navStyle}
        onChange={v => setTweak("navStyle", v)}
        options={["icons-labels", "icons-only", "labels-only"]}
      />
      <TweakSection label="Garage" />
      <TweakRadio
        label="Layout"
        value={tweaks.garageStyle}
        onChange={v => setTweak("garageStyle", v)}
        options={["carousel", "list", "stage"]}
      />
      <TweakSelect
        label="Active car"
        value={tweaks.activeCar}
        onChange={v => setTweak("activeCar", v)}
        options={["BMW 3-series", "Audi A4", "VW Golf"]}
      />
    </TweaksPanel>
  );
}

