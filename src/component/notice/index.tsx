import { useState } from "react"
import { NOTICE_TABS } from "../../const"
import { LazyDiv } from "../lazyDiv"

export const Notice = () => {
  const tabs = NOTICE_TABS.filter((t) => t.content.trim())
  const [activeIndex, setActiveIndex] = useState(0)

  if (tabs.length === 0) return null

  return (
    <LazyDiv className="card notice">
      <h2 className="english">Notice</h2>
      <div className="notice-title">안내사항</div>

      <div className="tab-bar">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={`tab-btn${i === activeIndex ? " active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tabs[activeIndex]?.content.split("\n").map((line, i) => (
          <p key={i}>{line || <br />}</p>
        ))}
      </div>
    </LazyDiv>
  )
}
