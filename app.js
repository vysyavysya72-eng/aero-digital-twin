(function () {
  "use strict";

  var scenarios = {
    normal: {
      tag: "PROFILE 01 / NOMINAL",
      status: "LOW RISK",
      level: "ok",
      health: 94.2,
      rul: 61,
      confidence: 91,
      anomaly: 0.08,
      reliability: 98.6,
      rpm: 2418,
      cht: 173,
      egt: 684,
      oil: 4.8,
      fuel: 34.6,
      vibration: 0.18,
      title: "Mission envelope remains healthy.",
      description: "Stable thermal behavior and pressure response match the virtual engine baseline across the current endurance leg.",
      fault: "04%",
      lead: "—",
      call: "PROCEED",
      foot: "All key signals remain inside the learned physics envelope.",
      diagnostic: "Healthy operating envelope",
      diagnosticCopy: "Twin prediction matches observed engine behavior.",
      advisory: "Continue mission. Maintain scheduled post-flight inspection.",
      alert: "NO ACTIVE FAULT",
      healthState: "NOMINAL / STABLE",
      reliabilityState: "PROCEED / LOW RISK",
      thermal: "STABLE",
      oilTrend: "4.8 BAR",
      anomalyTrend: "LOW",
      xai: [[15, "NOMINAL"], [12, "NOMINAL"], [10, "NOMINAL"]],
      replay: "AI baseline / nominal twin agreement",
      chart: { thermal: .3, oil: .54, anomaly: .09 }
    },
    hot: {
      tag: "PROFILE 02 / HOT WEATHER",
      status: "WATCH",
      level: "warning",
      health: 84.7,
      rul: 46,
      confidence: 88,
      anomaly: .34,
      reliability: 92.1,
      rpm: 2403,
      cht: 196,
      egt: 738,
      oil: 4.4,
      fuel: 36.1,
      vibration: .24,
      title: "Thermal margin is narrowing.",
      description: "High ambient temperature pushes cylinder and exhaust heat toward the learned endurance envelope; the twin predicts a manageable but rising thermal load.",
      fault: "21%",
      lead: "3.8 HR",
      call: "MONITOR",
      foot: "Recommended: reduce sustained throttle or add a thermal check at the next waypoint.",
      diagnostic: "Thermal trend watch",
      diagnosticCopy: "Thermal rise exceeds baseline but remains inside safety margin.",
      advisory: "Continue with a reduced-throttle endurance profile. Inspect the cooling path after recovery.",
      alert: "EARLY THERMAL WATCH",
      healthState: "WATCH / THERMAL LOAD",
      reliabilityState: "PROCEED / MONITOR",
      thermal: "RISING",
      oilTrend: "4.4 BAR",
      anomalyTrend: "WATCH",
      xai: [[76, "+ THERMAL"], [33, "ELEVATED"], [25, "NORMAL"]],
      replay: "Thermal model watch / high ambient load",
      chart: { thermal: .72, oil: .49, anomaly: .35 }
    },
    altitude: {
      tag: "PROFILE 03 / HIGH ALTITUDE",
      status: "LOW RISK",
      level: "ok",
      health: 89.5,
      rul: 52,
      confidence: 89,
      anomaly: .18,
      reliability: 95.3,
      rpm: 2358,
      cht: 166,
      egt: 702,
      oil: 4.6,
      fuel: 31.9,
      vibration: .21,
      title: "Altitude compensation is stable.",
      description: "The virtual model accounts for reduced density and adjusts its expected fuel and thermal envelope for the climb segment.",
      fault: "10%",
      lead: "—",
      call: "PROCEED",
      foot: "Altitude compensation remains aligned with predicted combustion behavior.",
      diagnostic: "Compensation verified",
      diagnosticCopy: "Observed fuel response is consistent with altitude-aware twin prediction.",
      advisory: "Continue mission. Record high-altitude data for future model calibration.",
      alert: "ALTITUDE MODE",
      healthState: "NOMINAL / COMPENSATED",
      reliabilityState: "PROCEED / LOW RISK",
      thermal: "COMPENSATED",
      oilTrend: "4.6 BAR",
      anomalyTrend: "LOW",
      xai: [[36, "EXPECTED"], [43, "ADAPTED"], [18, "NOMINAL"]],
      replay: "Altitude transition / compensation stable",
      chart: { thermal: .44, oil: .50, anomaly: .20 }
    },
    injector: {
      tag: "PROFILE 04 / INJECTOR DEGRADATION",
      status: "HIGH RISK",
      level: "danger",
      health: 66.8,
      rul: 14,
      confidence: 94,
      anomaly: .81,
      reliability: 72.4,
      rpm: 2389,
      cht: 194,
      egt: 781,
      oil: 4.6,
      fuel: 30.7,
      vibration: .41,
      title: "Probable injector flow degradation.",
      description: "The twin detects a coupled EGT imbalance, falling fuel response, and rising vibration before a conventional hard-limit alert occurs.",
      fault: "87%",
      lead: "2.1 HR",
      call: "DIVERT / INSPECT",
      foot: "Recommendation: reduce load, prioritize recovery, and inspect the injector circuit.",
      diagnostic: "Injector degradation likely",
      diagnosticCopy: "Multi-signal deviation is inconsistent with expected endurance behavior.",
      advisory: "Plan controlled recovery. Inspect injector flow and combustion balance before the next sortie.",
      alert: "PREDICTIVE FAULT",
      healthState: "DEGRADED / ACTION",
      reliabilityState: "DIVERT / HIGH RISK",
      thermal: "IMBALANCE",
      oilTrend: "4.6 BAR",
      anomalyTrend: "HIGH",
      xai: [[91, "IMBALANCE"], [86, "LOW FLOW"], [68, "RISING"]],
      replay: "Predictive fault / injector degradation likely",
      chart: { thermal: .94, oil: .49, anomaly: .83 }
    },
    misfire: {
      tag: "PROFILE 05 / COMBUSTION MISFIRE",
      status: "HIGH RISK",
      level: "danger",
      health: 58.3,
      rul: 7,
      confidence: 96,
      anomaly: .91,
      reliability: 61.2,
      rpm: 2284,
      cht: 201,
      egt: 766,
      oil: 4.5,
      fuel: 35.2,
      vibration: .69,
      title: "Combustion instability detected.",
      description: "High-frequency vibration and uneven thermal pulses indicate a probable misfire pattern. The projected mission reliability is no longer acceptable.",
      fault: "93%",
      lead: "34 MIN",
      call: "ABORT / RECOVER",
      foot: "Recommendation: abort the endurance leg and execute the controlled recovery plan.",
      diagnostic: "Misfire pattern likely",
      diagnosticCopy: "Vibration signature and RPM instability exceed learned combustion variance.",
      advisory: "Abort mission safely. Inspect ignition, injection, and cylinder compression before release.",
      alert: "CRITICAL PREDICTION",
      healthState: "CRITICAL / RECOVER",
      reliabilityState: "ABORT / HIGH RISK",
      thermal: "UNSTABLE",
      oilTrend: "4.5 BAR",
      anomalyTrend: "CRITICAL",
      xai: [[79, "PULSING"], [64, "UNEVEN"], [98, "SEVERE"]],
      replay: "Critical prediction / combustion instability",
      chart: { thermal: .89, oil: .46, anomaly: .93 }
    },
    oil: {
      tag: "PROFILE 06 / LUBRICATION RISK",
      status: "HIGH RISK",
      level: "danger",
      health: 63.9,
      rul: 11,
      confidence: 93,
      anomaly: .76,
      reliability: 69.6,
      rpm: 2397,
      cht: 186,
      egt: 711,
      oil: 2.9,
      fuel: 34.4,
      vibration: .48,
      title: "Lubrication pressure loss is emerging.",
      description: "Oil pressure is drifting down against a stable virtual load model. The mismatch indicates a possible lubrication-path restriction or pump-related issue.",
      fault: "84%",
      lead: "1.4 HR",
      call: "DIVERT / INSPECT",
      foot: "Recommendation: prioritize recovery and inspect the oil circuit before reuse.",
      diagnostic: "Lubrication fault likely",
      diagnosticCopy: "Pressure decay cannot be explained by the current operating and thermal state.",
      advisory: "Reduce engine load, recover aircraft, and inspect oil filter, pump, and pressure sensor path.",
      alert: "PREDICTIVE FAULT",
      healthState: "DEGRADED / ACTION",
      reliabilityState: "DIVERT / HIGH RISK",
      thermal: "STABLE",
      oilTrend: "2.9 BAR",
      anomalyTrend: "HIGH",
      xai: [[31, "NOMINAL"], [23, "NOMINAL"], [73, "RISING"]],
      replay: "Predictive fault / lubrication pressure decay",
      chart: { thermal: .51, oil: .12, anomaly: .78 }
    }
  };

  var current = scenarios.normal;
  var paused = false;
  var tick = 0;
  var toastTimer = null;
  var replayTimer = null;
  var playing = false;

  function id(name) {
    return document.getElementById(name);
  }

  function set(name, value) {
    var element = id(name);
    if (element) element.textContent = value;
  }

  function format(value, decimals) {
    return Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: decimals || 0,
      maximumFractionDigits: decimals || 0
    });
  }

  function bounded(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function wiggle(base, amount, step) {
    return base + (Math.sin(step * 1.71 + base * .043) + Math.cos(step * .73 + base * .009)) * amount * .5;
  }

  function modeFor(scenario) {
    if (scenario === scenarios.injector) return { thermal: "high", oil: "flat", anomaly: "rise" };
    if (scenario === scenarios.misfire) return { thermal: "spike", oil: "flat", anomaly: "critical" };
    if (scenario === scenarios.oil) return { thermal: "rise", oil: "drop", anomaly: "rise" };
    if (scenario === scenarios.hot) return { thermal: "rise", oil: "drop", anomaly: "rise" };
    return { thermal: "flat", oil: "flat", anomaly: "flat" };
  }

  function linePoints(anchor, mode, seed) {
    var result = [];
    for (var i = 0; i < 30; i += 1) {
      var x = i / 29 * 360;
      var value = anchor + Math.sin(i * .88 + seed) * 8 + Math.cos(i * .34 + seed) * 5;
      if (mode === "rise") value += Math.max(0, i - 12) * 2.2;
      if (mode === "drop") value -= Math.max(0, i - 10) * 2.1;
      if (mode === "spike") value += Math.max(0, i - 16) * 3.1 + (i % 4 === 0 ? 11 : 0);
      if (mode === "high") value += Math.max(0, i - 14) * 2.5;
      if (mode === "critical") value += Math.max(0, i - 11) * 3.8 + (i % 5 === 0 ? 13 : 0);
      var y = 103 - bounded(value, 5, 97);
      result.push(x.toFixed(1) + "," + y.toFixed(1));
    }
    return result.join(" ");
  }

  function updateCharts(scenario) {
    var modes = modeFor(scenario);
    id("egtLine").setAttribute("points", linePoints(32 + scenario.chart.thermal * 39, modes.thermal, 1));
    id("chtLine").setAttribute("points", linePoints(39 + scenario.chart.thermal * 27, modes.thermal === "spike" ? "rise" : "flat", 2));
    id("oilLine").setAttribute("points", linePoints(45 + scenario.chart.oil * 35, modes.oil, 3));
    id("anomalyLine").setAttribute("points", linePoints(12 + scenario.chart.anomaly * 35, modes.anomaly, 4));
  }

  function scenarioKey(scenario) {
    var keys = Object.keys(scenarios);
    for (var i = 0; i < keys.length; i += 1) {
      if (scenarios[keys[i]] === scenario) return keys[i];
    }
    return "normal";
  }

  function setRiskStyle(level) {
    document.body.classList.remove("warning", "danger");
    if (level === "warning") document.body.classList.add("warning");
    if (level === "danger") document.body.classList.add("danger");
    var state = id("statusSymbol");
    state.textContent = level === "ok" ? "✓" : "!";
  }

  function applyScenario(scenario, announce) {
    current = scenario;
    setRiskStyle(scenario.level);

    set("healthValue", scenario.health.toFixed(1));
    set("heroHealth", scenario.health.toFixed(1));
    set("rulValue", scenario.rul);
    set("rulConfidence", scenario.confidence + "%");
    set("anomalyValue", scenario.anomaly.toFixed(2));
    set("reliabilityValue", scenario.reliability.toFixed(1));
    set("rpmValue", format(scenario.rpm));
    set("rpmTag", format(scenario.rpm));
    set("chtValue", scenario.cht);
    set("egtTag", scenario.egt + "°C");
    set("oilTag", scenario.oil.toFixed(1) + " bar");
    set("fuelValue", scenario.fuel.toFixed(1));
    set("vibrationValue", scenario.vibration.toFixed(2));
    set("healthState", scenario.healthState);
    set("reliabilityState", scenario.reliabilityState);
    set("thermalTrend", scenario.thermal);
    set("oilTrend", scenario.oilTrend);
    set("anomalyTrend", scenario.anomalyTrend);
    set("modelSignal", scenario.level === "ok" ? "MODEL WATCHING" : "EARLY SIGNAL DETECTED");
    set("twinMode", scenario.level === "ok" ? "SYNCHRONIZED" : "VARIANCE DETECTED");
    set("alertLabel", scenario.alert);
    set("diagnosticTitle", scenario.diagnostic);
    set("diagnosticCopy", scenario.diagnosticCopy);
    set("advisoryText", scenario.advisory);
    set("xaiConfidence", scenario.confidence + "% CONFIDENCE");
    id("healthBar").style.width = scenario.health + "%";

    set("scenarioTag", scenario.tag);
    set("scenarioStatus", scenario.status);
    set("scenarioTitle", scenario.title);
    set("scenarioDescription", scenario.description);
    set("faultLikelihood", scenario.fault);
    set("leadTime", scenario.lead);
    set("missionCall", scenario.call);
    set("scenarioFoot", scenario.foot);
    set("replayEvent", scenario.replay);

    var bars = ["xaiEgt", "xaiFuel", "xaiVibration"];
    var labels = ["xaiEgtText", "xaiFuelText", "xaiVibrationText"];
    for (var i = 0; i < bars.length; i += 1) {
      id(bars[i]).style.width = scenario.xai[i][0] + "%";
      set(labels[i], scenario.xai[i][1]);
    }

    updateCharts(scenario);
    var chosen = scenarioKey(scenario);
    document.querySelectorAll("[data-scenario]").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-scenario") === chosen);
    });

    if (announce) {
      toast("Profile applied: " + scenario.tag + ". Mission call: " + scenario.call + ".");
    }
  }

  function updateClock() {
    set("missionClock", new Date().toISOString().slice(11, 19) + " UTC");
  }

  function liveUpdate() {
    if (paused) return;
    tick += 1;
    var s = current;
    var health = bounded(wiggle(s.health, .18, tick), 0, 100);
    var rpm = Math.round(wiggle(s.rpm, s.level === "danger" ? 45 : 17, tick));
    var egt = Math.round(wiggle(s.egt, s.level === "danger" ? 11 : 5, tick));
    var oil = wiggle(s.oil, s.level === "danger" ? .11 : .035, tick);
    set("healthValue", health.toFixed(1));
    set("heroHealth", health.toFixed(1));
    set("rpmValue", format(rpm));
    set("rpmTag", format(rpm));
    set("egtTag", egt + "°C");
    set("oilTag", oil.toFixed(1) + " bar");
    id("healthBar").style.width = health + "%";
    updateClock();
  }

  function toast(message) {
    var element = id("toast");
    element.textContent = message;
    element.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      element.classList.remove("show");
    }, 4200);
  }

  function setReplay(value) {
    var position = Number(value);
    var decimalHour = 8 + position * .063;
    var hour = Math.floor(decimalHour);
    var minute = Math.round((decimalHour - hour) * 60);
    set("replayTime", String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + ":18 UTC");
    var x = 47 + 603 * position / 100;
    var y = 251 - 189 * position / 100 + Math.sin(position / 10) * 44;
    id("mapUav").setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(-16)");
    document.querySelector(".active-event").style.opacity = position > 52 && position < 81 ? "1" : ".45";
  }

  function toggleReplay() {
    playing = !playing;
    set("replayPlay", playing ? "Ⅱ" : "▶");
    if (playing) {
      replayTimer = window.setInterval(function () {
        var slider = id("replaySlider");
        var next = Number(slider.value) + 1;
        slider.value = next > 100 ? 0 : next;
        setReplay(slider.value);
      }, 120);
    } else {
      window.clearInterval(replayTimer);
    }
  }

  function bind() {
    document.querySelectorAll("[data-scenario]").forEach(function (button) {
      button.addEventListener("click", function () {
        applyScenario(scenarios[button.getAttribute("data-scenario")], true);
      });
    });
    id("pauseButton").addEventListener("click", function () {
      paused = !paused;
      this.textContent = paused ? "▶" : "Ⅱ";
      this.setAttribute("aria-label", paused ? "Resume stream" : "Pause stream");
      toast(paused ? "Live telemetry stream paused." : "Live telemetry stream resumed.");
    });
    id("replaySlider").addEventListener("input", function (event) {
      setReplay(event.target.value);
    });
    id("replayPlay").addEventListener("click", toggleReplay);
    id("reportButton").addEventListener("click", function () {
      toast("Mission health report queued: twin state, evidence trace, RUL estimate, and maintenance advisory.");
    });

    function closeModal() {
      id("briefModal").classList.remove("open");
      id("briefModal").setAttribute("aria-hidden", "true");
    }
    id("briefButton").addEventListener("click", function () {
      id("briefModal").classList.add("open");
      id("briefModal").setAttribute("aria-hidden", "false");
    });
    id("closeBrief").addEventListener("click", closeModal);
    id("openCommand").addEventListener("click", function () {
      closeModal();
      id("command").scrollIntoView({ behavior: "smooth" });
    });
    id("briefModal").addEventListener("click", function (event) {
      if (event.target === id("briefModal")) closeModal();
    });
    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
    window.addEventListener("scroll", function () {
      document.querySelector(".nav-shell").classList.toggle("scrolled", window.scrollY > 22);
    });
    window.addEventListener("pointermove", function (event) {
      var glow = document.querySelector(".cursor-glow");
      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
    });
  }

  function reveal() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(function (element) {
      observer.observe(element);
    });
  }

  applyScenario(scenarios.normal, false);
  updateClock();
  setReplay(id("replaySlider").value);
  bind();
  reveal();
  window.setInterval(liveUpdate, 1250);
}());
