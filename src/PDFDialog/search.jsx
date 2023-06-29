import { not } from "ramda/es"
import React, { Component } from "react"
import classnames from "classnames"

import {
  globalHotkeysLockId,
  lockHotkeys,
  unlockHotkeys,
} from "delivery/exam/shared/services/hotkeysLock.es6"

import i18n from "@cirrus/legacy/app-common/alt/framework/i18n.js"
import StatelessTextInput from "@cirrus/legacy/app-components/form-controls/inputs/stateless-text-input/index.jsx"
import Icon from "@cirrus/legacy/app-components/icons/icon/index.jsx"

import styles from "./search.less"

class PdfSearch extends Component {
  search = null

  state = {
    isOpened: false,
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleWindowKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleWindowKeyUp)
  }

  handleWindowKeyUp = (e) => {
    const keyCode = e.which || e.keyCode

    if (keyCode == 70 && e.ctrlKey) {
      e.preventDefault()
      this.toggleSearch(true)
      e.stopImmediatePropagation()
    }
  }

  toggleSearch = (isOpened) => {
    this.setState({ isOpened }, () => {
      if (isOpened) this.search.focus()
    })
  }

  onBlur = () => {
    if (not(this.props.search)) this.toggleSearch(false)
    if (not(this.props.isAnswerLocked)) unlockHotkeys(globalHotkeysLockId)
  }

  render() {
    const { search, onNextMatch, onPrevMatch, onSearch } = this.props

    const { isOpened } = this.state

    return (
      <div className={styles.searchContainer}>
        <Icon icon={"fa-search"} onClick={() => this.toggleSearch(true)} className={styles.icon} />

        <div
          className={classnames(styles.wrapSearch, {
            [styles.hidden]: !(isOpened || search),
          })}>
          <StatelessTextInput
            autoComplete="off"
            setRef={(element) => (this.search = element)}
            placeholder={i18n("General:Search")}
            className={styles.search}
            value={search}
            onChange={onSearch}
            onKeyDown={(e) => {
              const keyCode = e.which || e.keyCode

              if (keyCode === 13) {
                e.preventDefault()
                e.stopPropagation()
                e.shiftKey ? onPrevMatch() : onNextMatch()
              } else if (keyCode === 27) {
                e.preventDefault()
                e.stopPropagation()
                this.search.blur()
              }
            }}
            onBlur={this.onBlur}
            onFocus={() => lockHotkeys(globalHotkeysLockId)}
          />

          <Icon icon={"fa-angle-left"} onClick={onPrevMatch} className={styles.icon} />

          <Icon icon={"fa-angle-right"} onClick={onNextMatch} className={styles.icon} />
        </div>
      </div>
    )
  }
}

export default PdfSearch
