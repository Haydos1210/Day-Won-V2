import styles from './DayOneLogo.module.css'

function DayOneLogo() {
  return (
    <>
      <div className={styles.DayOneLogoContainer}>
				<h1 className={styles.DayOneLogoD}>D</h1>
				<div className={styles.DayOneLogoW}>
					<div className={styles.DayOneLogoLeftLine}></div>
					<h1 className={styles.DayOneLogoD}>O</h1>
					<div className={styles.DayOneLogoRightLine}></div>
				</div>
			</div>
    </>
  );
}

export default DayOneLogo